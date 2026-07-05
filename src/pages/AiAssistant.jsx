import { useState } from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const initialReceipt = {
  description: 'Office supplies',
  amount: 42.5,
  contact: 'Staples',
  date: '2026-07-01',
  rawText: 'Purchase of printer paper and pens',
};

const initialInvoice = {
  total: 1250,
  contact: 'Northwind Traders',
  dueDate: '2026-07-15',
  status: 'AUTHORISED',
  lineItems: [
    { description: 'Consulting', quantity: 1, unitPrice: 1000 },
    { description: 'Setup fee', quantity: 1, unitPrice: 250 },
  ],
};

const initialAutomationData = {
  invoices: [
    { id: 'INV-1001', total: 1250, status: 'AUTHORISED', dueDate: '2026-07-15' },
    { id: 'INV-1002', total: 5000, status: 'OVERDUE', dueDate: '2026-06-20' },
  ],
  receipts: [
    { description: 'Office supplies', amount: 45, contact: 'Staples' },
    { description: 'Fuel', amount: 28, contact: 'Shell' },
  ],
  bankTransactions: [
    { description: 'Transfer to supplier', amount: 320, date: '2026-07-03' },
  ],
};

function AiAssistant() {
  const [receiptInput, setReceiptInput] = useState(JSON.stringify(initialReceipt, null, 2));
  const [invoiceInput, setInvoiceInput] = useState(JSON.stringify(initialInvoice, null, 2));
  const [automationInput, setAutomationInput] = useState(JSON.stringify(initialAutomationData, null, 2));
  const [receiptResult, setReceiptResult] = useState(null);
  const [invoiceResult, setInvoiceResult] = useState(null);
  const [automationResult, setAutomationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function runRequest(endpoint, payload, setter) {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${backendUrl}${endpoint}`, payload);
      setter(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Request failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">AI Assistant</p>
            <h1 className="text-2xl font-semibold text-slate-900">Try the new bookkeeping copilot</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Use the sample payloads below to test receipt analysis, invoice summarisation, and automation suggestions against the backend.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Backend endpoint: {backendUrl}
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Analyse receipt</h2>
            <button
              type="button"
              onClick={() => runRequest('/api/ai/analyse-receipt', { receipt: JSON.parse(receiptInput) }, setReceiptResult)}
              className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              {loading ? 'Working…' : 'Run'}
            </button>
          </div>
          <textarea
            className="h-48 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-sm"
            value={receiptInput}
            onChange={(event) => setReceiptInput(event.target.value)}
          />
          <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            <pre className="whitespace-pre-wrap break-words">{receiptResult ? JSON.stringify(receiptResult, null, 2) : 'No result yet.'}</pre>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Summarise invoice</h2>
            <button
              type="button"
              onClick={() => runRequest('/api/ai/summarise-invoice', { invoice: JSON.parse(invoiceInput) }, setInvoiceResult)}
              className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              {loading ? 'Working…' : 'Run'}
            </button>
          </div>
          <textarea
            className="h-48 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-sm"
            value={invoiceInput}
            onChange={(event) => setInvoiceInput(event.target.value)}
          />
          <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            <pre className="whitespace-pre-wrap break-words">{invoiceResult ? JSON.stringify(invoiceResult, null, 2) : 'No result yet.'}</pre>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Automation suggestions</h2>
            <button
              type="button"
              onClick={() => runRequest('/api/ai/automation-suggestions', { data: JSON.parse(automationInput) }, setAutomationResult)}
              className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-700"
            >
              {loading ? 'Working…' : 'Run'}
            </button>
          </div>
          <textarea
            className="h-48 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 font-mono text-sm"
            value={automationInput}
            onChange={(event) => setAutomationInput(event.target.value)}
          />
          <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            <pre className="whitespace-pre-wrap break-words">{automationResult ? JSON.stringify(automationResult, null, 2) : 'No result yet.'}</pre>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AiAssistant;
