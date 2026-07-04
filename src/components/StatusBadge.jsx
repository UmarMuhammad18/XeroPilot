const variants = {
  success: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  error: 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20',
};

function StatusBadge({ variant = 'pending', label }) {
  return (
    <span className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${variants[variant]}`}>
      {label}
    </span>
  );
}

export default StatusBadge;
