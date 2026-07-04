import { useMemo } from 'react';
import Card from '../components/Card';
import LogItem from '../components/LogItem';
import { useLogs } from '../hooks/useLogs';

function Logs() {
  const logsQuery = useLogs();

  const content = useMemo(() => {
    if (logsQuery.isLoading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3 text-slate-500">
            <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading logs…
          </div>
        </div>
      );
    }
    if (logsQuery.isError) {
      return (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-700">
          There was an error fetching logs. Please try again later.
        </div>
      );
    }
    if (!logsQuery.data?.length) {
      return (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center">
          <p className="text-sm font-medium text-slate-700">No activity yet</p>
          <p className="mt-1 text-sm text-slate-500">Log entries will appear here once automations run.</p>
        </div>
      );
    }
    return (
      <div className="space-y-3">
        {logsQuery.data.map((entry) => (
          <LogItem
            key={entry.id}
            timestamp={new Date(entry.timestamp).toLocaleString()}
            action={entry.action}
            status={
              entry.status === 'success'
                ? { label: 'Success', variant: 'success' }
                : { label: 'Error', variant: 'error' }
            }
            details={entry.details}
          />
        ))}
      </div>
    );
  }, [logsQuery.data, logsQuery.isError, logsQuery.isLoading]);

  return (
    <Card
      title="Activity timeline"
      description="Review what XeroPilot has processed, when workflows executed, and any errors requiring attention."
    >
      {content}
    </Card>
  );
}

export default Logs;
