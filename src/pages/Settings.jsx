import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

function Settings() {
  const [pref, setPref] = useState({
    autoSync: true,
    notifyErrors: true,
    updateInterval: '15',
  });

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card title="Xero connection">
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-emerald-900">Connected to Xero</p>
                <p className="mt-1 text-sm text-emerald-700">Organization: Eagle Finance Ltd.</p>
                <p className="mt-0.5 text-sm text-emerald-600">Last sync: 3 minutes ago</p>
              </div>
            </div>
          </div>
          <Button variant="primary">Reconnect account</Button>
        </div>
      </Card>

      <Card title="Automation preferences">
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="sync-frequency" className="mb-2 block text-sm font-medium text-slate-700">
                Auto-sync frequency
              </label>
              <select
                id="sync-frequency"
                value={pref.updateInterval}
                onChange={(event) => setPref((state) => ({ ...state, updateInterval: event.target.value }))}
                className={inputClass}
              >
                <option value="5">Every 5 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="30">Every 30 minutes</option>
              </select>
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium text-slate-700">Error notifications</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPref((state) => ({ ...state, notifyErrors: true }))}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    pref.notifyErrors
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Enabled
                </button>
                <button
                  type="button"
                  onClick={() => setPref((state) => ({ ...state, notifyErrors: false }))}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    !pref.notifyErrors
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Disabled
                </button>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="timezone" className="mb-2 block text-sm font-medium text-slate-700">
              Workflow timezone
            </label>
            <input id="timezone" value="UTC+0" readOnly className={`${inputClass} bg-slate-50`} />
          </div>

          <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-6">
            <Button variant="primary">Save settings</Button>
            <Button>Reset defaults</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Settings;
