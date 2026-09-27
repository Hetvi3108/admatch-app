import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, 'admatch.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    industry TEXT,
    buyer_type TEXT,
    goal TEXT,
    budget INTEGER,
    age_range TEXT,
    known_platforms TEXT,
    notes TEXT,
    results TEXT NOT NULL,
    top_channel TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

export default db;
