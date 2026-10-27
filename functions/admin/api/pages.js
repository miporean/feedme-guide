// Admin: list all pages (including drafts) and create/update a page.
import { db, json, handleError, rowToPage, randomId, HttpError } from '../../_lib/db.js';
import { normalizePage, slugify } from '../../_lib/page.js';

export async function onRequestGet({ env }) {
  try {
    const { results } = await (await db(env))
      .prepare('SELECT * FROM wiki_pages ORDER BY created_at')
      .all();
    return json({ pages: results.map(rowToPage) });
  } catch (e) {
    return handleError(e);
  }
}

export async function onRequestPost({ request, env, data }) {
  try {
    if (!(request.headers.get('Content-Type') || '').includes('application/json')) {
      throw new HttpError(415, 'Expected JSON');
    }
    const body = await request.json().catch(() => null);
    const page = normalizePage(body);
    const { category, title, published, ...rest } = page;
    const payload = JSON.stringify(rest);
    if (payload.length > 300000) throw new HttpError(413, 'Page is too large');

    const DB = await db(env);
    const now = new Date().toISOString();
    const who = data.admin.email;
    let id = typeof body.id === 'string' ? body.id : '';

    if (id && body.builtin === true) {
      // Edited copy of a built-in page (js/data.js): same id, created on first save.
      if (!/^[a-z0-9-]{1,80}$/.test(id)) throw new HttpError(400, 'Invalid page id');
      await DB.prepare(
        `INSERT INTO wiki_pages (id, category, title, data, published, builtin, created_at, created_by, updated_at, updated_by)
         VALUES (?, ?, ?, ?, ?, 1, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET category = excluded.category, title = excluded.title, data = excluded.data,
           published = excluded.published, updated_at = excluded.updated_at, updated_by = excluded.updated_by`
      ).bind(id, category, title, payload, published ? 1 : 0, now, who, now, who).run();
    } else if (id) {
      const res = await DB.prepare(
        'UPDATE wiki_pages SET category = ?, title = ?, data = ?, published = ?, updated_at = ?, updated_by = ? WHERE id = ?'
      ).bind(category, title, payload, published ? 1 : 0, now, who, id).run();
      if (!res.meta.changes) throw new HttpError(404, 'Page not found (it may have been deleted)');
    } else {
      id = `${slugify(title)}-${randomId(4)}`;
      await DB.prepare(
        'INSERT INTO wiki_pages (id, category, title, data, published, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      ).bind(id, category, title, payload, published ? 1 : 0, now, who, now, who).run();
    }

    const row = await DB.prepare('SELECT * FROM wiki_pages WHERE id = ?').bind(id).first();
    return json({ page: rowToPage(row) });
  } catch (e) {
    return handleError(e);
  }
}
