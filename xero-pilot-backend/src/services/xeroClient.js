import axios from 'axios';
import querystring from 'querystring';
import { getTokens, saveTokens } from '../db/database.js';
import { saveLog } from '../db/database.js';

const XERO_AUTHORIZE_URL = 'https://login.xero.com/identity/connect/authorize';
const XERO_TOKEN_URL = 'https://identity.xero.com/connect/token';
const XERO_API_BASE = 'https://api.xero.com';

const clientId = process.env.XERO_CLIENT_ID;
const clientSecret = process.env.XERO_CLIENT_SECRET;
const redirectUri = process.env.XERO_REDIRECT_URI;

function getBasicAuthHeader() {
  const credentials = `${clientId}:${clientSecret}`;
  return `Basic ${Buffer.from(credentials).toString('base64')}`;
}

export function getAuthUrl() {
  const params = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'openid profile email accounting.transactions accounting.settings accounting.contacts accounting.attachments accounting.reports.read accounting.reports.write accounting.journals accounting.tax accounting.balance',
    state: 'xeropilot-state',
  };

  return `${XERO_AUTHORIZE_URL}?${querystring.stringify(params)}`;
}

export async function exchangeCodeForTokens(code) {
  try {
    const response = await axios.post(
      XERO_TOKEN_URL,
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
      {
        headers: {
          Authorization: getBasicAuthHeader(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    const expiresAt = Date.now() + expires_in * 1000;
    const tenantId = await getTenantId(access_token);

    await saveTokens(access_token, refresh_token, expiresAt, tenantId);
    await saveLog('auth_callback', `Stored tokens for tenant ${tenantId}`);

    return { access_token, refresh_token, expires_at: expiresAt, tenant_id: tenantId };
  } catch (error) {
    await saveLog('auth_callback_error', error.message);
    throw error;
  }
}

export async function refreshAccessToken(refreshToken) {
  try {
    const response = await axios.post(
      XERO_TOKEN_URL,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          Authorization: getBasicAuthHeader(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;
    const expiresAt = Date.now() + expires_in * 1000;
    const tenantId = await getTenantId(access_token);

    await saveTokens(access_token, refresh_token, expiresAt, tenantId);
    await saveLog('refresh_token', `Refreshed token for tenant ${tenantId}`);

    return { access_token, refresh_token, expires_at: expiresAt, tenant_id: tenantId };
  } catch (error) {
    await saveLog('refresh_token_error', error.message);
    throw error;
  }
}

export async function getTenantId(accessToken) {
  const response = await axios.get(`${XERO_API_BASE}/connections`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  const connection = response.data[0];
  return connection ? connection.tenantId : null;
}

async function ensureValidAccessToken() {
  const tokens = await getTokens();
  if (!tokens) {
    throw new Error('Xero credentials not found. Connect your account first.');
  }

  if (Date.now() >= tokens.expires_at - 60000) {
    const refreshed = await refreshAccessToken(tokens.refresh_token);
    return refreshed.access_token;
  }

  return tokens.access_token;
}

export async function xeroRequest(method, endpoint, body = null) {
  try {
    const accessToken = await ensureValidAccessToken();
    const response = await axios({
      method,
      url: `${XERO_API_BASE}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: body,
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    await saveLog('xero_request_error', JSON.stringify(errorMessage));
    throw error;
  }
}
