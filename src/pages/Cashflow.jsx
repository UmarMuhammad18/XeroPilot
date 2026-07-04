import Card from '../components/Card';
import DataTable from '../components/DataTable';
import { useInvoices } from '../hooks/useInvoices';

const overdueInvoicesColumns = [
  { key: 'reference', label: 'Invoice' },
  { key: 'customer', label: 'Customer' },
  { key: 'dueDate', label: 'Due date' },
  { key: 'amount', label: 'Amount' },
];

const chartBars = [42, 58, 45, 72, 65, 80, 68, 90, 75, 85, 78, 92];

function Cashflow() {
  const invoicesQuery = useInvoices();

  const overdueRows =
    invoicesQuery.data
      ?.filter((invoice) => invoice.status === 'overdue')
      .map((invoice) => ({
        reference: invoice.reference,
        customer: invoice.customer,
        dueDate: invoice.dueDate,
        amount: invoice.amount,
      })) ?? [];

  return (
    <div className="space-y-6">
      <Card title="Cashflow overview">
        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Projected balance</p>
            <p className="mt-3 font-display text-4xl font-semibold tabular-nums text-slate-900">$128,400</p>
            <p className="mt-2 text-sm text-slate-600">
              Forecast for the next 30 days based on open invoices and bank receipts.
            </p>
            <div className="mt-8 flex h-36 items-end gap-1.5">
              {chartBars.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-sky-600 to-teal-400 opacity-80"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-400">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200/80 bg-white p-5">
              <p className="text-sm text-slate-500">Cash runway</p>
              <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-slate-900">24 days</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-5">
              <p className="text-sm text-slate-500">Pending receipts</p>
              <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-slate-900">53</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Overdue invoices">
          <DataTable columns={overdueInvoicesColumns} rows={overdueRows} />
        </Card>
        <Card title="Payment prediction">
          <div className="space-y-4 text-sm text-slate-600">
            <p>
              XeroPilot predicts when clients are most likely to pay based on prior activity and contact terms.
            </p>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Next expected payment</p>
              <p className="mt-2 font-display text-xl font-semibold text-slate-900">June 14, 2026</p>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">High-risk accounts</p>
              <p className="mt-2 font-display text-xl font-semibold text-slate-900">4 customers</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Cashflow;
