import { xeroRequest } from '../services/xeroClient.js';
import { saveLog } from '../db/database.js';

export async function fetchContacts(req, res) {
  try {
    const data = await xeroRequest('get', '/api.xro/2.0/Contacts');
    await saveLog('fetch_contacts', 'Fetched contacts from Xero');
    res.json(data);
  } catch (error) {
    await saveLog('fetch_contacts_error', error.message);
    res.status(500).json({ error: 'Unable to fetch contacts.' });
  }
}
