import { db, json, handleError } from '../../../_lib/db.js';

export async function onRequestDelete({ env, params }) {
  try {
    const res = await (await db(env))
      .prepare('DELETE FROM wiki_pages WHERE id = ?')
      .bind(String(params.id))
      .run();
    return json({ deleted: res.meta.changes > 0 });
  } catch (e) {
    return handleError(e);
  }
}
