function Card({ title, description, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm ${className}`}>
      {(title || description) && (
        <div className="mb-5">
          {title && <h2 className="font-display text-lg font-semibold text-slate-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

export default Card;
