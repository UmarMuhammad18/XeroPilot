function Button({ children, variant = 'secondary', disabled = false, onClick, type = 'button', className = '' }) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500';
  const styles = {
    primary: 'bg-sky-600 text-white shadow-sm hover:bg-sky-700 active:bg-sky-800',
    secondary: 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 active:bg-slate-100',
    danger: 'bg-rose-500 text-white shadow-sm hover:bg-rose-600 active:bg-rose-700',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
