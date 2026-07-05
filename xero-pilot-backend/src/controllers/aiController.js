import { saveLog } from '../db/database.js';
import { analyseReceipt, summariseInvoice, suggestAutomations } from '../services/aiService.js';

export async function analyseReceiptController(req, res) {
  try {
    const { receipt } = req.body;

    if (!receipt) {
      return res.status(400).json({ error: 'Receipt data is required.' });
    }

    const result = await analyseReceipt(receipt);
    await saveLog('ai_analyse_receipt', `Analysed receipt for ${receipt.description || 'unknown receipt'}`);

    res.json(result);
  } catch (error) {
    await saveLog('ai_analyse_receipt_error', error.message);
    res.status(500).json({ error: error.message || 'Unable to analyse receipt.' });
  }
}

export async function summariseInvoiceController(req, res) {
  try {
    const { invoice } = req.body;

    if (!invoice) {
      return res.status(400).json({ error: 'Invoice data is required.' });
    }

    const result = await summariseInvoice(invoice);
    await saveLog('ai_summarise_invoice', `Summarised invoice for ${invoice.contact || 'unknown contact'}`);

    res.json(result);
  } catch (error) {
    await saveLog('ai_summarise_invoice_error', error.message);
    res.status(500).json({ error: error.message || 'Unable to summarise invoice.' });
  }
}

export async function automationSuggestionsController(req, res) {
  try {
    const payload = req.body?.data ?? req.body;

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Xero data is required.' });
    }

    const result = await suggestAutomations(payload);
    await saveLog('ai_automation_suggestions', 'Generated automation suggestions from recent Xero data');

    res.json(result);
  } catch (error) {
    await saveLog('ai_automation_suggestions_error', error.message);
    res.status(500).json({ error: error.message || 'Unable to generate automation suggestions.' });
  }
}
