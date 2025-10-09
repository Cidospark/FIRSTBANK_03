
// App.jsx
// Fraud Detection & Transaction Monitoring System — React Single File Demo
// ---------------------------------------------------------
// Features:
// ✅ Simulated real-time transactions
// ✅ Rule-based detection (high amount, cross-border, velocity, blacklisted)
// ✅ Alert dashboard (color-coded severities)
// ✅ Summary statistics
// ---------------------------------------------------------
// To run:
//   1. npm create vite@latest fraud-demo -- --template react
//   2. cd fraud-demo && npm install
//   3. Replace App.jsx with this file
//   4. npm run dev

import React, { useEffect, useState } from "react";

export default function App() {
  const HIGH_AMOUNT = 10000;
  const VELOCITY_THRESHOLD = 5;
  const VELOCITY_WINDOW_MS = 10_000;
  const COUNTRIES = ["NG", "US", "GB", "IN", "DE", "CN"];
  const CHANNELS = ["WEB", "POS", "API", "MOBILE"];
  const BLACKLIST = ["ACCT-BAD00001", "ACCT-BAD00002"];

  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({ total: 0, flagged: 0 });

  // Helper to generate random data
  const randomAccount = () =>
    "ACCT-" +
    Math.random().toString(36).substring(2, 10).toUpperCase().slice(0, 8);

  const randomChoice = (arr:string[]) => arr[Math.floor(Math.random() * arr.length)];

  const generateTransaction = () => {
    const now = new Date();
    const from = Math.random() < 0.1 ? "ACCT-BAD00001" : randomAccount();
    const to = randomAccount();
    const amount = +(Math.random() * 15000).toFixed(2);
    return {
      id: crypto.randomUUID(),
      from,
      to,
      amount,
      fromCountry: randomChoice(COUNTRIES),
      toCountry: randomChoice(COUNTRIES),
      channel: randomChoice(CHANNELS),
      timestamp: now.toISOString(),
    };
  };

  const evaluateRules = (tx, history) => {
    const alerts = [];

    if (BLACKLIST.includes(tx.from)) {
      alerts.push({
        rule: "BLACKLISTED_ACCOUNT",
        severity: "HIGH",
        note: "Sender is blacklisted",
      });
    }

    if (tx.amount >= HIGH_AMOUNT) {
      alerts.push({
        rule: "HIGH_AMOUNT",
        severity: "HIGH",
        note: `Amount ≥ ₦${HIGH_AMOUNT}`,
      });
    }

    if (tx.fromCountry !== tx.toCountry) {
      alerts.push({
        rule: "CROSS_BORDER",
        severity: "LOW",
        note: "Cross-border transaction",
      });
    }

    const recent = history.filter(
      (t) =>
        t.from === tx.from &&
        new Date(tx.timestamp) - new Date(t.timestamp) < VELOCITY_WINDOW_MS
    );
    if (recent.length >= VELOCITY_THRESHOLD) {
      alerts.push({
        rule: "VELOCITY",
        severity: "MEDIUM",
        note: `${recent.length} tx in <10s`,
      });
    }

    return alerts;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const tx = generateTransaction();
      setTransactions((prev) => {
        const updated = [...prev, tx].slice(-100);
        const rulesTriggered = evaluateRules(tx, updated);
        if (rulesTriggered.length) {
          const newAlerts = rulesTriggered.map((r) => ({
            id: crypto.randomUUID(),
            txId: tx.id,
            ...r,
            from: tx.from,
            amount: tx.amount,
            time: tx.timestamp,
          }));
          setAlerts((prevA) => [...newAlerts, ...prevA].slice(0, 50));
        }
        setStats((prevS) => ({
          total: prevS.total + 1,
          flagged: prevS.flagged + (rulesTriggered.length ? 1 : 0),
        }));
        return updated;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-2xl font-bold mb-2 text-blue-700">
        💳 Fraud Detection & Transaction Monitoring
      </h1>
      <p className="text-sm text-gray-600 mb-4">
        Simulated transactions with client-side fraud rule detection
      </p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Stat label="Total Transactions" value={stats.total} color="text-blue-600" />
        <Stat label="Flagged Alerts" value={stats.flagged} color="text-red-600" />
        <Stat
          label="Detection Rate"
          value={
            stats.total
              ? ((stats.flagged / stats.total) * 100).toFixed(1) + "%"
              : "0%"
          }
          color="text-orange-600"
        />
      </div>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Recent Alerts</h2>
        <div className="bg-white shadow rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Rule</th>
                <th className="p-2 text-left">Severity</th>
                <th className="p-2 text-left">From</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              {alerts.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-3 text-gray-500 text-center">
                    No alerts yet...
                  </td>
                </tr>
              )}
              {alerts.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-2 font-semibold">{a.rule}</td>
                  <td className={`p-2 ${severityColor(a.severity)}`}>
                    {a.severity}
                  </td>
                  <td className="p-2">{a.from}</td>
                  <td className="p-2">₦{a.amount}</td>
                  <td className="p-2">{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Live Transactions
        </h2>
        <div className="bg-white shadow rounded overflow-hidden max-h-80 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2 text-left">From</th>
                <th className="p-2 text-left">To</th>
                <th className="p-2 text-left">Amount</th>
                <th className="p-2 text-left">Channel</th>
                <th className="p-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(-20).reverse().map((tx) => (
                <tr key={tx.id} className="border-t">
                  <td className="p-2">{tx.from}</td>
                  <td className="p-2">{tx.to}</td>
                  <td className="p-2">₦{tx.amount}</td>
                  <td className="p-2">{tx.channel}</td>
                  <td className="p-2">
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// --- Small UI helper components ---
const severityColor = (sev) =>
  ({
    HIGH: "text-red-600 font-bold",
    MEDIUM: "text-orange-600 font-semibold",
    LOW: "text-yellow-600 font-semibold",
  }[sev] || "text-gray-600");

const Stat = ({ label, value, color }) => (
  <div className="bg-white shadow rounded p-4">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </div>
);
