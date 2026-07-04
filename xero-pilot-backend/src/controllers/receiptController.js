import { xeroRequest } from '../services/xeroClient.js';
import { saveLog } from '../db/database.js';

export async function fetchReceipts(req, res) {
  try {
    const data = await xeroRequest('get', '/api.xro/2.0/Receipts');
    await saveLog('fetch_receipts', 'Fetched receipts from Xero');
    res.json(data);
  } catch (error) {
    await saveLog('fetch_receipts_error', error.message);
    res.status(500).json({ error: 'Unable to fetch receipts.' });
  }
}

export async function categorizeReceipt(req, res) {
  try {
    const { receiptId, accountCode } = req.body;
    if (!receiptId || !accountCode) {
      return res.status(400).json({ error: 'receiptId and accountCode are required.' });
    }

    const data = await xeroRequest('post', '/api.xro/2.0/Receipts', {
      Receipts: [{ ReceiptID: receiptId, LineItems: [{ AccountCode: accountCode }]] }],
    });
    await saveLog('categorize_receipt', `Categorized receipt ${receiptId} to account ${accountCode}`);
    res.json(data);
  } catch (error) {
    await saveLog('categorize_receipt_error', error.message);
    res.status(500).json({ error: 'Unable to categorize receipt.' });
  }
}
