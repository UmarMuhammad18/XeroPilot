import { useMemo, useState } from 'react';
import Card from '../components/Card';
import AutomationCard from '../components/AutomationCard';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useRunAutomation } from '../hooks/useRunAutomation';

const workflows = [
  {
    id: 'receive-payments',
    title: 'Automated payment reconciliation',
    description: 'Match incoming payments to outstanding invoices and update Xero automatically.',
    status: { label: 'Active', variant: 'success' },
    lastRun: '2 minutes ago',
  },
  {
    id: 'receipt-capture',
    title: 'Receipt processing',
    description: 'Scan, categorize, and attach receipts to supplier bills in Xero.',
    status: { label: 'Scheduled', variant: 'pending' },
    lastRun: '12 minutes ago',
  },
  {
    id: 'cashflow-forecast',
    title: 'Cashflow forecasting',
    description: 'Analyze bank transactions and forecast cashflow for the next 30 days.',
    status: { label: 'Needs review', variant: 'error' },
    lastRun: '1 hour ago',
  },
];

function Automations() {
  const [activeAutomation, setActiveAutomation] = useState(null);
  const runAutomation = useRunAutomation();

  const automationMessage = useMemo(() => {
    if (runAutomation.isLoading) return 'Running automation…';
    if (runAutomation.isError) return 'Automation failed. Check logs for details.';
    if (runAutomation.isSuccess) return 'Automation started successfully.';
    return 'Select a workflow to execute or monitor active schedules.';
  }, [runAutomation.isError, runAutomation.isLoading, runAutomation.isSuccess]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card title="Workflow library" description="Available automations for your Xero organization.">
          <div className="space-y-3">
            {workflows.map((workflow) => (
              <AutomationCard
                key={workflow.id}
                title={workflow.title}
                description={workflow.description}
                status={workflow.status}
                lastRun={workflow.lastRun}
                onRun={() => setActiveAutomation(workflow)}
              />
            ))}
          </div>
        </Card>

        <Card title="Automation status">
          <p className="text-sm text-slate-600">{automationMessage}</p>
          <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
            <p className="text-sm font-medium text-slate-900">Latest result</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Automations are evaluated every 5 minutes. Notifications appear for failed or blocked workflows.
            </p>
          </div>
          <Button variant="secondary" className="mt-4">
            Review scheduling rules
          </Button>
        </Card>
      </div>

      <Card title="Automation insights">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Active workflows', value: '3' },
            { label: 'Success rate', value: '92%' },
            { label: 'Queued events', value: '14' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        title={activeAutomation?.title ?? ''}
        body={
          <div className="space-y-3">
            <p>{activeAutomation?.description}</p>
            <p>Triggering this workflow will process transactions and update the ledger in Xero.</p>
          </div>
        }
        footer={
          <>
            <Button
              variant="primary"
              onClick={() => {
                runAutomation.mutate(activeAutomation?.id);
                setActiveAutomation(null);
              }}
              disabled={!activeAutomation}
            >
              Confirm run
            </Button>
            <Button onClick={() => setActiveAutomation(null)}>Cancel</Button>
          </>
        }
        isOpen={Boolean(activeAutomation)}
        onClose={() => setActiveAutomation(null)}
      />
    </div>
  );
}

export default Automations;
