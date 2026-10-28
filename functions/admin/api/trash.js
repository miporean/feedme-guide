// Admin: delete a page or category (moves it to the Staff page's "Deleted"
// list), or restore one from that list. Nothing is erased.
import { db, json, handleError, HttpError } from '../../_lib/db.js';
import { CATEGORIES } from '../../_lib/page.js';

export async function onRequestPost({ request, env, data }) {
  try {
    if (!(request.headers.get('Content-Type') || '').includes('application/json')) {
      throw new HttpError(415, 'Expected JSON');
    }
    const body = await request.json().catch(() => null) || {};
    const { action, kind, id } = body;
    if (kind !== 'page' && kind !== 'category') throw new HttpError(400, 'Invalid kind');
    if (typeof id !== 'string' || !/^[a-z0-9-]{1,80}$/.test(id)) throw new HttpError(400, 'Invalid id');
    if (kind === 'category' && !CATEGORIES.includes(id)) throw new HttpError(400, 'Unknown category');

    const DB = await db(env);
    if (action === 'delete') {
      const title = typeof body.title === 'string' ? body.title.trim().slice(0, 200) : '';
      await DB.prepare(
        `INSERT INTO wiki_deleted (kind, id, title, deleted_at, deleted_by) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(kind, id) DO UPDATE SET title = excluded.title, deleted_at = excluded.deleted_at, deleted_by = excluded.deleted_by`
      ).bind(kind, id, title || id, new Date().toISOString(), data.admin.email).run();
    } else if (action === 'restore') {
      await DB.prepare('DELETE FROM wiki_deleted WHERE kind = ? AND id = ?').bind(kind, id).run();
    } else {
      throw new HttpError(400, 'Invalid action');
    }
    return json({ ok: true });
  } catch (e) {
    return handleError(e);
  }
}
