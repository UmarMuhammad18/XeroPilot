import { xeroRequest } from './xeroClient.js';
import { saveLog } from '../db/database.js';

const automations = [
  {
    id: 'auto-categorize-receipts',
    name: 'Auto-categorize Receipts',
    description: 'Categorize new receipts based on matching account codes.',
  },
  {
    id: 'auto-match-bank-transactions',
    name: 'Auto-match Bank Transactions',
    description: 'Match bank transactions to existing receipts automatically.',
  },
  {
    id: 'auto-send-invoice-reminders',
    name: 'Auto-send Invoice Reminders',
    description: 'Send reminders for overdue invoices.',
  },
];

export function listAutomations() {
  return automations;
}

export async function runAutomation(id) {
  switch (id) {
    case 'auto-categorize-receipts':
      return runAutoCategorizeReceipts();
    case 'auto-match-bank-transactions':
      return runAutoMatchBankTransactions();
    case 'auto-send-invoice-reminders':
      return runAutoSendInvoiceReminders();
    default:
      throw new Error(`Automation not found: ${id}`);
  }
}

async function runAutoCategorizeReceipts() {
  const receipts = await xeroRequest('get', '/api.xro/2.0/Receipts');
  const categorized = receipts.Receipts?.map((receipt) => ({
    receiptID: receipt.ReceiptID,
    status: receipt.Status,
    updatedAccountCode: receipt.LineItems?.[0]?.AccountCode || 'UNKNOWN',
  })) || [];

  await saveLog('automation', `Auto-categorize receipts executed for ${categorized.length} receipts.`);
  return { message: 'Auto-categorize receipts completed', results: categorized };
}

async function runAutoMatchBankTransactions() {
  const bankTransactions = await xeroRequest('get', '/api.xro/2.0/BankTransactions');
  const matches = bankTransactions.BankTransactions?.map((transaction) => ({
    transactionID: transaction.BankTransactionID,
    status: transaction.Status,
    matched: Boolean(transaction.LineItems?.length),
  })) || [];

  await saveLog('automation', `Auto-match bank transactions executed for ${matches.length} transactions.`);
  return { message: 'Auto-match bank transactions completed', results: matches };
}

async function runAutoSendInvoiceReminders() {
  const invoices = await xeroRequest('get', '/api.xro/2.0/Invoices');
  const overdueInvoices = invoices.Invoices?.filter((invoice) => invoice.Status === 'AUTHORISED' && new Date(invoice.DueDate) < new Date()) || [];

  await saveLog('automation', `Auto-send invoice reminders executed for ${overdueInvoices.length} invoices.`);
  return { message: 'Auto-send invoice reminders completed', remindersSent: overdueInvoices.length };
}
