import React, { useState, useMemo } from "react";
// Single-file React + TypeScript demo
// - Tailwind CSS classes used for styling
// - Recharts for charting (npm: recharts)
// - PapaParse for CSV parsing (npm: papaparse)
// Default export is the demo app component.

import Papa from "papaparse";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

type RecordRow = { date: string; amount: number };

function parseCsvText(text: string): RecordRow[] {
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });

  const rows: RecordRow[] = (parsed.data || [])
    .map((r) => {
      const date = r["date"] || r["Date"] || r["d"];
      const amt = r["amount"] || r["Amount"] || r["value"] || r["Value"];
      const parsedAmt = amt ? Number(String(amt).replace(/[^0-9.-]+/g, "")) : NaN;
      if (!date || Number.isNaN(parsedAmt)) return null;
      return { date: String(date), amount: parsedAmt } as RecordRow;
    })
    .filter(Boolean) as RecordRow[];

  // Sort by date ascending if parseable
  rows.sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
  return rows;
}

// Simple linear regression (least squares) to forecast next 'n' steps.
function linearRegressionForecast(data: RecordRow[], steps = 12): RecordRow[] {
  if (data.length === 0) return [];

  // x = index (0..n-1), y = amount
  const n = data.length;
  const xs = Array.from({ length: n }, (_, i) => i);
  const ys = data.map((d) => d.amount);

  const sumX = xs.reduce((s, v) => s + v, 0);
  const sumY = ys.reduce((s, v) => s + v, 0);
  const sumXY = xs.reduce((s, v, i) => s + v * ys[i], 0);
  const sumXX = xs.reduce((s, v) => s + v * v, 0);

  const denom = n * sumXX - sumX * sumX;
  const slope = denom === 0 ? 0 : (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;

  const forecasts: RecordRow[] = [];

  // Guess future dates by extending the last date by 1 day (or month if monthly data)
  const lastDate = new Date(data[data.length - 1].date);
  const dayDiff = (() => {
    if (data.length < 2) return 1;
    const d0 = new Date(data[data.length - 2].date);
    const d1 = new Date(data[data.length - 1].date);
    return Math.max(1, Math.round((+d1 - +d0) / (1000 * 60 * 60 * 24)));
  })();

  for (let i = 0; i < steps; i++) {
    const x = n + i; // next index
    const y = intercept + slope * x;
    const nextDate = new Date(+lastDate + dayDiff * (i + 1) * 24 * 60 * 60 * 1000);
    forecasts.push({ date: nextDate.toISOString().slice(0, 10), amount: Number(y.toFixed(2)) });
  }

  return forecasts;
}

// Moving average forecast as a softer baseline
function movingAverageForecast(data: RecordRow[], window = 3, steps = 12): RecordRow[] {
  if (data.length === 0) return [];
  const arr = data.map((d) => d.amount);
  const lastDate = new Date(data[data.length - 1].date);
  const dayDiff = data.length < 2 ? 1 : Math.max(1, Math.round((+new Date(data[data.length - 1].date) - +new Date(data[data.length - 2].date)) / (1000 * 60 * 60 * 24)));

  const forecasts: RecordRow[] = [];
  for (let i = 0; i < steps; i++) {
    const slice = arr.slice(Math.max(0, arr.length - window));
    const avg = slice.reduce((s, v) => s + v, 0) / slice.length;
    const nextDate = new Date(+lastDate + dayDiff * (i + 1) * 24 * 60 * 60 * 1000);
    const val = Number(avg.toFixed(2));
    forecasts.push({ date: nextDate.toISOString().slice(0, 10), amount: val });
    arr.push(val); // append so subsequent moving averages include forecast
  }
  return forecasts;
}

const SAMPLE_CSV = `date,amount
2025-01-01,50
2025-01-05,30
2025-01-10,70
2025-01-15,60
2025-01-20,80
2025-01-25,45
`;

export default function FinancialHabitForecastDemo(): JSX.Element {
  const [csvText, setCsvText] = useState(SAMPLE_CSV);
  const [data, setData] = useState<RecordRow[]>(parseCsvText(SAMPLE_CSV));
  const [forecastHorizon, setForecastHorizon] = useState(12);
  const [method, setMethod] = useState<"linear" | "ma">("linear");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      setCsvText(text);
      const parsed = parseCsvText(text);
      setData(parsed);
    };
    reader.readAsText(file);
  }

  function handleParseButton() {
    const parsed = parseCsvText(csvText);
    setData(parsed);
  }

  const forecasts = useMemo(() => {
    if (method === "linear") return linearRegressionForecast(data, forecastHorizon);
    return movingAverageForecast(data, 3, forecastHorizon);
  }, [data, forecastHorizon, method]);

  const chartData = useMemo(() => {
    // combine historical and forecast for charting
    const histor = data.map((d) => ({ date: d.date, Actual: d.amount }));
    const fut = forecasts.map((d) => ({ date: d.date, Forecast: d.amount }));
    // join by date into one series
    const map = new Map<string, any>();
    histor.forEach((d) => map.set(d.date, { date: d.date, Actual: d.Actual }));
    fut.forEach((d) => map.set(d.date, { ...(map.get(d.date) || { date: d.date }), Forecast: d.Forecast }));
    const arr = Array.from(map.values()).sort((a, b) => (a.date > b.date ? 1 : -1));
    return arr;
  }, [data, forecasts]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Financial Habit Forecasting — Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">CSV input (headers: date, amount)</label>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            rows={8}
            className="w-full p-2 border rounded mb-2 font-mono text-sm"
          />
          <div className="flex gap-2">
            <button className="px-3 py-2 rounded shadow bg-slate-800 text-white" onClick={handleParseButton}>
              Parse CSV
            </button>
            <label className="px-3 py-2 rounded shadow bg-white border cursor-pointer">
              Upload CSV
              <input type="file" accept="text/csv" onChange={handleFile} className="hidden" />
            </label>
            <button
              className="px-3 py-2 rounded shadow bg-white border"
              onClick={() => {
                setCsvText(SAMPLE_CSV);
                setData(parseCsvText(SAMPLE_CSV));
              }}
            >
              Load sample
            </button>
          </div>
        </div>

        <div className="col-span-1">
          <div className="p-4 border rounded">
            <div className="mb-2">Forecast settings</div>
            <label className="block text-xs">Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value as any)} className="w-full p-2 mb-2">
              <option value="linear">Linear regression</option>
              <option value="ma">Moving average</option>
            </select>

            <label className="block text-xs">Horizon (steps)</label>
            <input
              type="number"
              value={forecastHorizon}
              onChange={(e) => setForecastHorizon(Math.max(1, Number(e.target.value) || 1))}
              className="w-full p-2 mb-2"
            />

            <div className="text-sm text-slate-600">Parsed rows: {data.length}</div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded">
          <h2 className="font-medium mb-2">Preview rows</h2>
          <div className="text-sm overflow-auto max-h-64">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="py-1">Date</th>
                  <th className="py-1">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1">{r.date}</td>
                    <td className="py-1">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-medium mb-2">Forecast (next {forecastHorizon} steps)</h2>
          <div className="text-sm overflow-auto max-h-64">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="py-1">Date</th>
                  <th className="py-1">Forecast</th>
                </tr>
              </thead>
              <tbody>
                {forecasts.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-1">{r.date}</td>
                    <td className="py-1">{r.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="h-80 p-4 border rounded">
        <h2 className="font-medium mb-2">Chart</h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Actual" stroke="#8884d8" dot={false} />
            <Line type="monotone" dataKey="Forecast" stroke="#82ca9d" strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        <strong>Notes:</strong> CSV must have headers `date` and `amount` (ISO date like 2025-01-01). This demo uses a simple linear regression or moving average for forecasting — good for demonstration and prototypes but not a production forecasting pipeline. For production, consider time-series models (ARIMA, Prophet, or LSTM), and more careful date-frequency handling.
      </div>
    </div>
  );
}
