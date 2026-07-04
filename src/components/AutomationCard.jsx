import StatusBadge from './StatusBadge';
import Button from './Button';

function AutomationCard({ title, description, status, lastRun, onRun }) {
  return (
    <article className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5 transition hover:border-slate-300 hover:bg-white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-slate-900">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</p>
        </div>
        <StatusBadge variant={status.variant} label={status.label} />
      </div>
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-200/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">Last run {lastRun}</div>
        <Button variant="primary" onClick={onRun} className="sm:w-auto">
          Run automation
        </Button>
      </div>
    </article>
  );
}

export default AutomationCard;
