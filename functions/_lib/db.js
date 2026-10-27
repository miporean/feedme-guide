// D1 storage for wiki pages created in the browser editor.
// Tables are created on first use, so a fresh empty database works as-is.

let schemaReady = false;

export async function db(env) {
  if (!env.DB) throw new HttpError(500, 'Database not connected. Bind a D1 database named DB to this Pages project.');
  if (!schemaReady) {
    await env.DB.batch([
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS wiki_pages (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        data TEXT NOT NULL,
        published INTEGER NOT NULL DEFAULT 1,
        builtin INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        created_by TEXT,
        updated_at TEXT NOT NULL,
        updated_by TEXT
      )`),
      env.DB.prepare(`CREATE TABLE IF NOT EXISTS wiki_images (
        id TEXT PRIMARY KEY,
        mime TEXT NOT NULL,
        data BLOB NOT NULL,
        size INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        created_by TEXT
      )`)
    ]);
    schemaReady = true;
  }
  return env.DB;
}

export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

export function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }
  });
}

export function handleError(e) {
  if (e instanceof HttpError) return json({ error: e.message }, e.status);
  console.error(e);
  return json({ error: 'Server error' }, 500);
}

export function randomId(len = 10) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(bytes, b => alphabet[b % alphabet.length]).join('');
}

export function rowToPage(row) {
  const page = JSON.parse(row.data);
  return {
    ...page,
    id: row.id,
    category: row.category,
    title: row.title,
    published: !!row.published,
    builtin: !!row.builtin,
    updatedAt: row.updated_at,
    updatedBy: row.updated_by
  };
}
