import React, { useEffect, useMemo, useState } from "react";

// Single-file budgeting demo (React + TypeScript + Tailwind)
// Drop into a Vite/CRA project with Tailwind + recharts installed.
// npm install recharts

type Transaction = {
  id: string;
  date: string; // ISO
  description: string;
  category: string;
  amount: number; // positive = expense, negative = income (for clarity we'll store expenses as positive)
};

const SAMPLE_TRANSACTIONS: Transaction[] = [
  { id: "t1", date: "2025-09-01", description: "Groceries", category: "Food", amount: 58.4 },
  { id: "t2", date: "2025-09-03", description: "Salary (Sep)", category: "Income", amount: -2500 },
  { id: "t3", date: "2025-09-05", description: "Electricity bill", category: "Utilities", amount: 72.13 },
  { id: "t4", date: "2025-09-12", description: "Uber", category: "Transport", amount: 8.5 },
  { id: "t5", date: "2025-09-15", description: "Dinner", category: "Food", amount: 24.0 },
];

const STORAGE_KEY = "budgeting_demo_transactions_v1";

// Lightweight helper
const uid = () => Math.random().toString(36).slice(2, 9);

export default function BudgetingDemo(): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Transaction[];
    } catch (e) {
      console.warn("Could not read localStorage", e);
    }
    return SAMPLE_TRANSACTIONS;
  });

  const [form, setForm] = useState({ date: "", description: "", category: "", amount: "" });
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.warn("Could not write localStorage", e);
    }
  }, [transactions]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    transactions.forEach((t) => set.add(t.category || "Uncategorized"));
    return Array.from(set).sort();
  }, [transactions]);

  const totalsByCategory = useMemo(() => {
    const map = new Map<string, number>();
    for (const t of transactions) {
      const cat = t.category || "Uncategorized";
      const existing = map.get(cat) ?? 0;
      map.set(cat, existing + (t.amount > 0 ? t.amount : 0));
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const balance = useMemo(() => {
    return transactions.reduce((acc, t) => acc - (t.amount > 0 ? t.amount : -t.amount), 0);
  }, [transactions]);

  const visible = useMemo(() => {
    const filtered = transactions.filter((t) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.date.includes(q)
      );
    });
    return filtered.sort((a, b) => {
      if (sortBy === "date") return a.date < b.date ? 1 : -1;
      return b.amount - a.amount;
    });
  }, [transactions, query, sortBy]);

  // Add transaction
  function addTransaction() {
    if (!form.date || !form.description || !form.category || !form.amount) return;
    const amount = Number(form.amount);
    if (Number.isNaN(amount)) return;
    const t: Transaction = { id: uid(), date: form.date, description: form.description, category: form.category, amount };
    setTransactions((s) => [t, ...s]);
    setForm({ date: "", description: "", category: "", amount: "" });
  }

  function removeTransaction(id: string) {
    setTransactions((s) => s.filter((t) => t.id !== id));
  }

  function importCSV(text: string) {
    // Very permissive CSV parser: date,description,category,amount
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const parsed: Transaction[] = [];
    for (const line of lines) {
      const parts = line.split(",");
      if (parts.length < 4) continue;
      const [date, description, category, amountStr] = parts;
      const amount = Number(amountStr);
      if (Number.isNaN(amount)) continue;
      parsed.push({ id: uid(), date: date.trim(), description: description.trim(), category: category.trim(), amount });
    }
    if (parsed.length) setTransactions((s) => [...parsed, ...s]);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const txt = String(reader.result ?? "");
      importCSV(txt);
    };
    reader.readAsText(file);
    e.currentTarget.value = ""; // reset
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Lightweight visual: uses inline SVG (no external libs) to show category breakdown
  function CategoryChart({ data }: { data: { name: string; value: number }[] }) {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const radius = 60;
    let cumulative = 0;
    const colors = ["#60a5fa", "#34d399", "#f97316", "#f472b6", "#a78bfa", "#fca5a5"];
    return (
      <svg viewBox="0 0 200 120" width="100%" height={140} className="mx-auto">
        <g transform="translate(100,70)">
          {data.map((d, i) => {
            const slice = (d.value / total) * Math.PI * 2;
            const x1 = Math.cos(cumulative) * radius;
            const y1 = Math.sin(cumulative) * radius;
            cumulative += slice;
            const x2 = Math.cos(cumulative) * radius;
            const y2 = Math.sin(cumulative) * radius;
            const large = slice > Math.PI ? 1 : 0;
            const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
            return <path key={d.name} d={path} fill={colors[i % colors.length]} stroke="#fff" />;
          })}
        </g>
      </svg>
    );
  }

  // Quick suggestion: top categories
  const topCategory = totalsByCategory.slice().sort((a, b) => b.value - a.value)[0];

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Budgeting demo</h1>
        <div className="text-right">
          <div className="text-sm text-gray-500">Balance</div>
          <div className="text-xl font-mono">${balance.toFixed(2)}</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-2xl shadow p-4">
          <div className="flex items-center gap-2 mb-4">
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="Search description, category, date"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="border rounded px-2 py-2">
              <option value="date">Sort by date</option>
              <option value="amount">Sort by amount</option>
            </select>
            <input type="file" accept=".csv" onChange={handleFile} className="text-sm" />
            <button onClick={exportJSON} className="px-3 py-2 rounded bg-gray-100">Export</button>
          </div>

          <div className="space-y-3 max-h-96 overflow-auto">
            {visible.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded border">
                <div>
                  <div className="text-sm text-gray-500">{t.date}</div>
                  <div className="font-medium">{t.description}</div>
                  <div className="text-sm text-gray-400">{t.category}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono">${t.amount.toFixed(2)}</div>
                  <div className="mt-2 flex gap-2 justify-end">
                    <button
                      onClick={() => navigator.clipboard?.writeText(JSON.stringify(t))}
                      className="text-xs px-2 py-1 border rounded">
                      Copy
                    </button>
                    <button onClick={() => removeTransaction(t.id)} className="text-xs px-2 py-1 border rounded text-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Add transaction</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="border rounded px-2 py-2" />
              <input placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="border rounded px-2 py-2" />
              <input placeholder="Category" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="border rounded px-2 py-2" />
              <input placeholder="Amount (positive expense, negative income)" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} className="border rounded px-2 py-2" />
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={addTransaction} className="px-4 py-2 rounded bg-blue-500 text-white">Add</button>
              <button onClick={() => { setTransactions(SAMPLE_TRANSACTIONS); }} className="px-4 py-2 rounded bg-gray-100">Reset sample</button>
            </div>
          </div>
        </section>

        <aside className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2">Spending by category</h3>
          <div className="mb-4">
            <CategoryChart data={totalsByCategory} />
          </div>

          <div className="space-y-2 mb-4">
            {totalsByCategory.map((c) => (
              <div key={c.name} className="flex justify-between text-sm">
                <div>{c.name}</div>
                <div className="font-mono">${c.value.toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-600">
            Top category: <span className="font-medium">{topCategory ? `${topCategory.name} — $${topCategory.value.toFixed(2)}` : "—"}</span>
          </div>

          <div className="mt-4 border-t pt-3">
            <h4 className="font-semibold">Quick import format</h4>
            <div className="text-xs mt-2 text-gray-600">CSV rows: <code>YYYY-MM-DD,Description,Category,Amount</code></div>
            <div className="text-xs mt-2 text-gray-600">Example: <code>2025-10-01,Taxi,Transport,4.5</code></div>
          </div>
        </aside>
      </div>

      <footer className="mt-6 text-xs text-gray-500">Single-file demo • Persisted to localStorage • CSV import/export</footer>
    </div>
  );
}
