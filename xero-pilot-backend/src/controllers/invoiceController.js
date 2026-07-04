import { xeroRequest } from '../services/xeroClient.js';
import { saveLog } from '../db/database.js';

export async function fetchInvoices(req, res) {
  try {
    const data = await xeroRequest('get', '/api.xro/2.0/Invoices');
    await saveLog('fetch_invoices', 'Fetched invoices from Xero');
    res.json(data);
  } catch (error) {
    await saveLog('fetch_invoices_error', error.message);
    res.status(500).json({ error: 'Unable to fetch invoices.' });
  }
}

export async function createInvoice(req, res) {
  try {
    const invoice = req.body;
    const data = await xeroRequest('post', '/api.xro/2.0/Invoices', { Invoices: [invoice] });
    await saveLog('create_invoice', `Created invoice ${invoice.InvoiceNumber || 'unknown'}`);
    res.json(data);
  } catch (error) {
    await saveLog('create_invoice_error', error.message);
    res.status(500).json({ error: 'Unable to create invoice.' });
  }
}

export async function updateInvoiceStatus(req, res) {
  try {
    const { invoiceId, status } = req.body;
    if (!invoiceId || !status) {
      return res.status(400).json({ error: 'invoiceId and status are required.' });
    }

    const data = await xeroRequest('post', '/api.xro/2.0/Invoices', {
      Invoices: [{ InvoiceID: invoiceId, Status: status }],
    });
    await saveLog('update_invoice_status', `Updated invoice ${invoiceId} to ${status}`);
    res.json(data);
  } catch (error) {
    await saveLog('update_invoice_status_error', error.message);
    res.status(500).json({ error: 'Unable to update invoice status.' });
  }
}
