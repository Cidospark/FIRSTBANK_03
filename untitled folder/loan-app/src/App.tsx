import React, { useEffect, useMemo, useState } from "react";

// Loan Management System — Single-file React demo
// Save this as LoanManagementSystem.jsx and render it in your app (e.g. import into App.jsx)
// Uses Tailwind CSS for basic styling. No external APIs — in-memory + localStorage persistence.

export default function LoanManagementSystem() {
  // Models
  const defaultLoans = [
    {
      id: cryptoRandomId(),
      borrower: { name: "Ada N.", phone: "+2348010000000", email: "ada@example.com" },
      principal: 200000,
      annualRate: 0.12,
      termMonths: 12,
      appliedOn: new Date().toISOString(),
      approvedOn: null,
      disbursedOn: null,
      status: "Applied",
      payments: [],
    },
  ];

  const [loans, setLoans] = useState(() => {
    try {
      const raw = localStorage.getItem("loans_demo_v1");
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return defaultLoans;
  });

  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const selectedLoan = useMemo(() => loans.find((l) => l.id === selectedLoanId) || null, [loans, selectedLoanId]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", principal: "", rate: "0.12", term: "12" });
  const [repayAmount, setRepayAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem("loans_demo_v1", JSON.stringify(loans));
  }, [loans]);

  // Helpers
  function cryptoRandomId() {
    return Math.random().toString(36).slice(2, 9);
  }

  function applyLoan(e) {
    e?.preventDefault();
    const borrower = { name: form.name || "Unknown", phone: form.phone || "", email: form.email || "" };
    const loan = {
      id: cryptoRandomId(),
      borrower,
      principal: Number(form.principal) || 0,
      annualRate: Number(form.rate) || 0,
      termMonths: Number(form.term) || 0,
      appliedOn: new Date().toISOString(),
      approvedOn: null,
      disbursedOn: null,
      status: "Applied",
      payments: [],
    };
    setLoans((s) => [loan, ...s]);
    setForm({ name: "", phone: "", email: "", principal: "", rate: "0.12", term: "12" });
  }

  function updateLoan(updated) {
    setLoans((s) => s.map((l) => (l.id === updated.id ? updated : l)));
  }

  function approveLoan(id) {
    const loan = loans.find((l) => l.id === id);
    if (!loan || loan.status !== "Applied") return;
    loan.status = "Approved";
    loan.approvedOn = new Date().toISOString();
    updateLoan({ ...loan });
  }

  function disburseLoan(id) {
    const loan = loans.find((l) => l.id === id);
    if (!loan || loan.status !== "Approved") return;
    loan.status = "Disbursed";
    loan.disbursedOn = new Date().toISOString();
    updateLoan({ ...loan });
  }

  function makeRepayment(id, amount) {
    const loan = loans.find((l) => l.id === id);
    if (!loan || loan.status !== "Disbursed") return;
    // allocate amount to schedule greedily
    const schedule = generateAmortizationSchedule(loan);
    let remaining = Number(amount);
    const paymentsToAdd = [];
    for (const row of schedule) {
      if (remaining <= 0) break;
      // How much of this scheduled payment has been already paid? Simplified: we ignore per-month tracking and allocate greedily
      const toCover = row.payment; // simplified
      const alloc = Math.min(toCover, remaining);
      const interestPortion = Math.min(row.interest, alloc);
      const principalPortion = alloc - interestPortion;
      paymentsToAdd.push({ date: new Date().toISOString(), amount: alloc, interest: interestPortion, principal: principalPortion });
      remaining -= alloc;
    }
    loan.payments = [...loan.payments, ...paymentsToAdd];

    // if outstanding small, close
    if (outstandingBalance(loan) <= 0.05) loan.status = "Closed";
    updateLoan({ ...loan });
  }

  function outstandingBalance(loan) {
    const schedule = generateAmortizationSchedule(loan);
    const totalScheduled = schedule.reduce((s, r) => s + r.payment, 0);
    const paid = (loan.payments || []).reduce((s, p) => s + (p.amount || 0), 0);
    const remaining = Math.max(totalScheduled - paid, 0);
    return Number(remaining.toFixed(2));
  }

  function generateAmortizationSchedule(loan) {
    const rows = [];
    let balance = loan.principal;
    const monthlyRate = loan.annualRate / 12;
    let monthlyPayment = monthlyRepayment(loan.principal, loan.annualRate, loan.termMonths);
    const start = loan.disbursedOn ? new Date(loan.disbursedOn) : new Date();
    for (let m = 1; m <= loan.termMonths; m++) {
      const interest = Number((balance * monthlyRate).toFixed(2));
      let principal = Number((monthlyPayment - interest).toFixed(2));
      if (m === loan.termMonths) {
        principal = Number(balance.toFixed(2));
        monthlyPayment = Number((principal + interest).toFixed(2));
      }
      balance = Number((balance - principal).toFixed(2));
      rows.push({ month: m, date: new Date(start.getFullYear(), start.getMonth() + m, start.getDate()).toISOString().slice(0, 10), payment: monthlyPayment, principal, interest, balance: Math.max(balance, 0) });
    }
    return rows;
  }

  function monthlyRepayment(P, annualRate, n) {
    if (n === 0) return 0;
    const r = annualRate / 12;
    if (r === 0) return Number((P / n).toFixed(2));
    const monthly = (r * P) / (1 - Math.pow(1 + r, -n));
    return Number(monthly.toFixed(2));
  }

  // UI
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Loan Management System — Demo</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Loans</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Borrower</th>
                <th>Principal</th>
                <th>Rate</th>
                <th>Term</th>
                <th>Status</th>
                <th>Outstanding</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loans.map((l) => (
                <tr key={l.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{l.borrower?.name}</td>
                  <td>{formatCurrency(l.principal)}</td>
                  <td>{(l.annualRate * 100).toFixed(2)}%</td>
                  <td>{l.termMonths}m</td>
                  <td>{l.status}</td>
                  <td>{formatCurrency(outstandingBalance(l))}</td>
                  <td className="text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="text-xs px-2 py-1 rounded bg-slate-100" onClick={() => setSelectedLoanId(l.id)}>
                        View
                      </button>
                      {l.status === "Applied" && (
                        <button className="text-xs px-2 py-1 rounded bg-green-100" onClick={() => approveLoan(l.id)}>
                          Approve
                        </button>
                      )}
                      {l.status === "Approved" && (
                        <button className="text-xs px-2 py-1 rounded bg-indigo-100" onClick={() => disburseLoan(l.id)}>
                          Disburse
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-2">Apply for a loan</h2>
          <form onSubmit={applyLoan} className="space-y-2">
            <input className="w-full p-2 border rounded" placeholder="Name" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
            <input className="w-full p-2 border rounded" placeholder="Phone" value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
            <input className="w-full p-2 border rounded" placeholder="Email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
            <input className="w-full p-2 border rounded" placeholder="Principal" value={form.principal} onChange={(e) => setForm((s) => ({ ...s, principal: e.target.value }))} />
            <input className="w-full p-2 border rounded" placeholder="Annual rate (0.12)" value={form.rate} onChange={(e) => setForm((s) => ({ ...s, rate: e.target.value }))} />
            <input className="w-full p-2 border rounded" placeholder="Term months" value={form.term} onChange={(e) => setForm((s) => ({ ...s, term: e.target.value }))} />
            <div className="flex gap-2">
              <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Apply</button>
              <button type="button" className="px-3 py-2 bg-gray-200 rounded" onClick={() => { setForm({ name: "", phone: "", email: "", principal: "", rate: "0.12", term: "12" }); }}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-2">Selected loan</h2>
        {!selectedLoan && <div className="text-sm text-slate-500">Choose a loan "View" to see details.</div>}
        {selectedLoan && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-medium">{selectedLoan.borrower.name}</div>
                  <div className="text-sm text-slate-500">{selectedLoan.borrower.phone} • {selectedLoan.borrower.email}</div>
                  <div className="mt-2 text-sm">Applied: {formatDate(selectedLoan.appliedOn)}</div>
                  <div className="text-sm">Status: {selectedLoan.status}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">{formatCurrency(selectedLoan.principal)}</div>
                  <div className="text-sm">{(selectedLoan.annualRate * 100).toFixed(2)}% • {selectedLoan.termMonths}m</div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Amortization schedule</h3>
                <div className="overflow-auto max-h-64">
                  <table className="w-full text-sm mt-2">
                    <thead>
                      <tr className="border-b">
                        <th className="py-1">M</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Bal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {generateAmortizationSchedule(selectedLoan).map((r) => (
                        <tr key={r.month} className="border-b">
                          <td className="py-1">{r.month}</td>
                          <td>{r.date}</td>
                          <td>{formatCurrency(r.payment)}</td>
                          <td>{formatCurrency(r.principal)}</td>
                          <td>{formatCurrency(r.interest)}</td>
                          <td>{formatCurrency(r.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Payments</h3>
                <div className="text-sm text-slate-500">Total paid: {formatCurrency((selectedLoan.payments || []).reduce((s,p)=>s+(p.amount||0),0))}</div>
                <ul className="mt-2 space-y-1 text-sm">
                  {(selectedLoan.payments || []).slice().reverse().map((p, i) => (
                    <li key={i} className="flex justify-between border rounded p-2">
                      <div>
                        <div className="font-medium">{formatDate(p.date)}</div>
                        <div className="text-xs text-slate-500">Interest {formatCurrency(p.interest)} • Principal {formatCurrency(p.principal)}</div>
                      </div>
                      <div className="font-semibold">{formatCurrency(p.amount)}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="p-3 border rounded">
                <div className="text-sm">Outstanding</div>
                <div className="text-xl font-bold">{formatCurrency(outstandingBalance(selectedLoan))}</div>
                <div className="mt-3">
                  {selectedLoan.status === "Disbursed" && (
                    <div className="space-y-2">
                      <input className="w-full p-2 border rounded" type="number" value={repayAmount} onChange={(e)=>setRepayAmount(e.target.value)} placeholder="Amount to repay" />
                      <button className="w-full px-3 py-2 bg-green-600 text-white rounded" onClick={()=>{ makeRepayment(selectedLoan.id, Number(repayAmount)||0); setRepayAmount(0); }}>
                        Make Repayment
                      </button>
                    </div>
                  )}

                  {selectedLoan.status === "Applied" && (
                    <button className="w-full px-3 py-2 bg-green-600 text-white rounded" onClick={()=>approveLoan(selectedLoan.id)}>Approve</button>
                  )}

                  {selectedLoan.status === "Approved" && (
                    <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded" onClick={()=>disburseLoan(selectedLoan.id)}>Disburse</button>
                  )}

                  <button className="w-full mt-2 px-3 py-2 bg-gray-200 rounded" onClick={()=>{ navigator.clipboard?.writeText(JSON.stringify(selectedLoan, null, 2)) }}>Copy JSON</button>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500">You can also select another loan from the list to view its details.</div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-slate-500">Demo: data is stored in localStorage under <code>loans_demo_v1</code>. Refresh to persist — edit code to integrate a backend or API.</div>
    </div>
  );
}

// small helpers
function formatCurrency(n) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(n || 0);
}
function formatDate(s) {
  if (!s) return "-";
  try { return new Date(s).toLocaleDateString(); } catch { return s; }
}

// Note: generateAmortizationSchedule is duplicated inside component scope for clarity to keep the file single-file.
function generateAmortizationSchedule(loan) {
  if (!loan) return [];
  const rows = [];
  let balance = loan.principal;
  const monthlyRate = loan.annualRate / 12;
  let monthlyPayment = monthlyRepayment(loan.principal, loan.annualRate, loan.termMonths);
  const start = loan.disbursedOn ? new Date(loan.disbursedOn) : new Date();
  for (let m = 1; m <= loan.termMonths; m++) {
    const interest = Number((balance * monthlyRate).toFixed(2));
    let principal = Number((monthlyPayment - interest).toFixed(2));
    if (m === loan.termMonths) {
      principal = Number(balance.toFixed(2));
      monthlyPayment = Number((principal + interest).toFixed(2));
    }
    balance = Number((balance - principal).toFixed(2));
    rows.push({ month: m, date: new Date(start.getFullYear(), start.getMonth() + m, start.getDate()).toISOString().slice(0, 10), payment: monthlyPayment, principal, interest, balance: Math.max(balance, 0) });
  }
  return rows;
}

function monthlyRepayment(P, annualRate, n) {
  if (n === 0) return 0;
  const r = annualRate / 12;
  if (r === 0) return Number((P / n).toFixed(2));
  const monthly = (r * P) / (1 - Math.pow(1 + r, -n));
  return Number(monthly.toFixed(2));
}
