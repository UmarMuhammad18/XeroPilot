import { listAutomations as getList, runAutomation as executeAutomation } from '../services/automationEngine.js';
import { saveLog } from '../db/database.js';

export async function listAutomations(req, res) {
  try {
    const automations = getList();
    await saveLog('list_automations', 'Fetched automation list');
    res.json({ automations });
  } catch (error) {
    await saveLog('list_automations_error', error.message);
    res.status(500).json({ error: 'Unable to fetch automations.' });
  }
}

export async function runAutomation(req, res) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Automation id is required.' });
    }

    const result = await executeAutomation(id);
    await saveLog('run_automation', `Ran automation ${id}`);
    res.json({ success: true, result });
  } catch (error) {
    await saveLog('run_automation_error', error.message);
    res.status(500).json({ error: 'Unable to run automation.' });
  }
}
