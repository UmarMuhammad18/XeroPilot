import { useState } from 'react';
import StatusBadge from './StatusBadge';

function LogItem({ timestamp, action, status, details }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition hover:border-slate-300 hover:bg-white">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-medium text-slate-900">{action}</p>
          <p className="mt-0.5 text-xs text-slate-500">{timestamp}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <StatusBadge variant={status.variant} label={status.label} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="text-sm font-medium text-sky-600 transition hover:text-sky-700"
          >
            {open ? 'Hide details' : 'View details'}
          </button>
        </div>
      </div>
      {open && (
        <p className="mt-4 border-t border-slate-200/80 pt-4 text-sm leading-relaxed text-slate-600">{details}</p>
      )}
    </div>
  );
}

export default LogItem;
