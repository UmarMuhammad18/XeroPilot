import { useLocation } from 'react-router-dom';

const pageMeta = {
  '/': { title: 'Dashboard', subtitle: 'Overview of your accounting automations' },
  '/automations': { title: 'Automations', subtitle: 'Manage and run workflow automations' },
  '/logs': { title: 'Activity Logs', subtitle: 'Review workflow execution history' },
  '/cashflow': { title: 'Cashflow', subtitle: 'Forecast and monitor cash position' },
  '/settings': { title: 'Settings', subtitle: 'Connection and automation preferences' },
};

function Topbar({ onMenuClick }) {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] ?? pageMeta['/'];

  return (
    <header className="fixed left-0 right-0 top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-md md:left-72">
      <div className="flex h-20 items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 md:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="min-w-0">
            <h1 className="truncate font-display text-xl font-semibold text-slate-900">{meta.title}</h1>
            <p className="hidden truncate text-sm text-slate-500 sm:block">{meta.subtitle}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live sync
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 to-teal-500 text-sm font-semibold text-white shadow-sm">
            XP
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
