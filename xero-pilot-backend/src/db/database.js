import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function initDatabase() {
  if (db) return db;

  db = await open({
    filename: './xero-pilot.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tokens (
      id INTEGER PRIMARY KEY,
      access_token TEXT,
      refresh_token TEXT,
      expires_at INTEGER,
      tenant_id TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY,
      action TEXT,
      details TEXT,
      timestamp INTEGER
    );
  `);

  return db;
}

export async function saveTokens(accessToken, refreshToken, expiresAt, tenantId) {
  const database = await initDatabase();
  await database.run(
    `INSERT INTO tokens (access_token, refresh_token, expires_at, tenant_id)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       access_token = excluded.access_token,
       refresh_token = excluded.refresh_token,
       expires_at = excluded.expires_at,
       tenant_id = excluded.tenant_id;
    `,
    accessToken,
    refreshToken,
    expiresAt,
    tenantId
  );
}

export async function getTokens() {
  const database = await initDatabase();
  return database.get(`SELECT * FROM tokens ORDER BY id DESC LIMIT 1`);
}

export async function saveLog(action, details) {
  const database = await initDatabase();
  const timestamp = Date.now();
  await database.run(
    `INSERT INTO logs (action, details, timestamp) VALUES (?, ?, ?)`,
    action,
    details,
    timestamp
  );
}

export async function getLogs() {
  const database = await initDatabase();
  return database.all(`SELECT * FROM logs ORDER BY timestamp DESC`);
}
