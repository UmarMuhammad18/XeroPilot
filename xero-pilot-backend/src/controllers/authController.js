import { getAuthUrl, exchangeCodeForTokens } from '../services/xeroClient.js';
import { getTokens } from '../db/database.js';
import { saveLog } from '../db/database.js';

export async function login(req, res) {
  try {
    const url = getAuthUrl();
    res.redirect(url);
  } catch (error) {
    await saveLog('auth_login_error', error.message);
    res.status(500).json({ error: 'Unable to generate Xero authorization URL.' });
  }
}

export async function callback(req, res) {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required.' });
    }

    const tokenData = await exchangeCodeForTokens(code);
    await saveLog('auth_callback', `Authorization successful for tenant ${tokenData.tenant_id}`);
    return res.json({ success: true, tokenData });
  } catch (error) {
    await saveLog('auth_callback_error', error.message);
    return res.status(500).json({ error: 'Unable to exchange authorization code.' });
  }
}

export async function status(req, res) {
  try {
    const tokens = await getTokens();
    if (!tokens) {
      return res.json({ connected: false });
    }

    const isExpired = Date.now() >= tokens.expires_at;
    return res.json({ connected: true, expires_at: tokens.expires_at, expired: isExpired, tenant_id: tokens.tenant_id });
  } catch (error) {
    await saveLog('auth_status_error', error.message);
    return res.status(500).json({ error: 'Unable to retrieve Xero connection status.' });
  }
}
