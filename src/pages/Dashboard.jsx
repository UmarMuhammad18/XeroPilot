import { useMemo } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { useInvoices } from '../hooks/useInvoices';
import { useReceipts } from '../hooks/useReceipts';
import { useBankTransactions } from '../hooks/useBankTransactions';
import { useLogs } from '../hooks/useLogs';

const summaryItems = [
  {
    key: 'invoices',
    label: 'Invoices',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    color: 'sky',
  },
  {
    key: 'receipts',
    label: 'Receipts',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 2.25h.008v.008h-.008V11.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM9.75 15h.008v.008H9.75V15zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    key: 'bank',
    label: 'Bank transactions',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    color: 'teal',
  },
];

const iconColors = {
  sky: 'bg-sky-50 text-sky-600',
  violet: 'bg-violet-50 text-violet-600',
  teal: 'bg-teal-50 text-teal-600',
};

function Dashboard() {
  const invoicesQuery = useInvoices();
  const receiptsQuery = useReceipts();
  const bankQuery = useBankTransactions();
  const logsQuery = useLogs();

  const automationStatus = useMemo(() => {
    if (logsQuery.isLoading || logsQuery.isError) {
      return { label: 'Sync pending', variant: 'pending' };
    }
    const latest = logsQuery.data?.[0];
    if (!latest) return { label: 'No activity', variant: 'pending' };
    return latest.status === 'success'
      ? { label: 'Healthy', variant: 'success' }
      : { label: 'Review alerts', variant: 'error' };
  }, [logsQuery.data, logsQuery.isError, logsQuery.isLoading]);

  const counts = {
    invoices: invoicesQuery.data?.length ?? 0,
    receipts: receiptsQuery.data?.length ?? 0,
    bank: bankQuery.data?.transactions?.length ?? 0,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {summaryItems.map((item) => (
          <Card key={item.key} className="!p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-slate-900">
                  {counts[item.key]}
                </p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconColors[item.color]}`}>
                {item.icon}
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              {item.key === 'bank'
                ? 'Latest bank synchronization status included.'
                : `Real-time ${item.label.toLowerCase()} summary from Xero.`}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Quick actions">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="primary" className="w-full">
              Sync all ledgers
            </Button>
            <Button className="w-full">Review overdue invoices</Button>
            <Button className="w-full">Launch receipt automation</Button>
            <Button className="w-full">Update bank connection</Button>
          </div>
        </Card>

        <Card title="Automation health">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-slate-600">Workflow status across all connected services.</p>
            <StatusBadge variant={automationStatus.variant} label={automationStatus.label} />
          </div>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
            <p>
              XeroPilot continuously scans invoices, receipts, and bank activity. Trigger automations and review results from the logs page.
            </p>
            <p>Keep your Xero connection active and schedules up to date for reliable workflows.</p>
          </div>
        </Card>
      </div>

      <Card title="Connection status">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4">
            <p className="text-sm font-medium text-emerald-800">Xero connection</p>
            <p className="mt-2 text-sm text-emerald-700">Live sync enabled — organization connected and ready.</p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
            <p className="text-sm text-slate-500">Health check</p>
            <p className="mt-2 font-display text-2xl font-semibold text-slate-900">OK</p>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
            <p className="text-sm text-slate-500">Updates</p>
            <p className="mt-2 font-display text-2xl font-semibold text-slate-900">No alerts</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;
