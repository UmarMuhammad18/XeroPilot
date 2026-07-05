import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../../db.json');

let db;

export async function initDatabase() {
  if (db) return db;

  const adapter = new JSONFile(filePath);
  const defaultData = { tokens: [], logs: [] };
  db = new Low(adapter, defaultData);
  await db.read();

  db.data ||= defaultData;
  await db.write();

  return db;
}

export async function saveTokens(accessToken, refreshToken, expiresAt, tenantId) {
  const database = await initDatabase();
  const tokenEntry = {
    id: database.data.tokens.length + 1,
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt,
    tenant_id: tenantId,
  };

  database.data.tokens.push(tokenEntry);
  await database.write();
}

export async function getTokens() {
  const database = await initDatabase();
  const tokens = database.data.tokens;
  return tokens.length > 0 ? tokens[tokens.length - 1] : null;
}

export async function saveLog(action, details) {
  const database = await initDatabase();
  const timestamp = Date.now();
  const logEntry = {
    id: database.data.logs.length + 1,
    action,
    details,
    timestamp,
  };

  database.data.logs.push(logEntry);
  await database.write();
}

export async function getLogs() {
  const database = await initDatabase();
  return database.data.logs.slice().reverse();
}
