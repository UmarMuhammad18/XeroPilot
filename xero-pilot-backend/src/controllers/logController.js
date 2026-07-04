import { getLogs } from '../db/database.js';
import { saveLog } from '../db/database.js';

export async function fetchLogs(req, res) {
  try {
    const logs = await getLogs();
    await saveLog('fetch_logs', 'Fetched logs from database');
    res.json({ logs });
  } catch (error) {
    await saveLog('fetch_logs_error', error.message);
    res.status(500).json({ error: 'Unable to fetch logs.' });
  }
}
