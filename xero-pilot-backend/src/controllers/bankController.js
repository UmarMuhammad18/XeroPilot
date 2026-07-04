import { xeroRequest } from '../services/xeroClient.js';
import { saveLog } from '../db/database.js';

export async function fetchBankTransactions(req, res) {
  try {
    const data = await xeroRequest('get', '/api.xro/2.0/BankTransactions');
    await saveLog('fetch_bank_transactions', 'Fetched bank transactions from Xero');
    res.json(data);
  } catch (error) {
    await saveLog('fetch_bank_transactions_error', error.message);
    res.status(500).json({ error: 'Unable to fetch bank transactions.' });
  }
}

export async function matchBankTransaction(req, res) {
  try {
    const { transactionId, receiptId } = req.body;
    if (!transactionId || !receiptId) {
      return res.status(400).json({ error: 'transactionId and receiptId are required.' });
    }

    const data = await xeroRequest('post', '/api.xro/2.0/BankTransactions', {
      BankTransactions: [{ BankTransactionID: transactionId, LineItems: [{ ReceiptID: receiptId }] }],
    });
    await saveLog('match_bank_transaction', `Matched bank transaction ${transactionId} to receipt ${receiptId}`);
    res.json(data);
  } catch (error) {
    await saveLog('match_bank_transaction_error', error.message);
    res.status(500).json({ error: 'Unable to match bank transaction.' });
  }
}
