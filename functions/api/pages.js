// Public: published pages created in the editor.
import { db, json, handleError, rowToPage } from '../_lib/db.js';

export async function onRequestGet({ env }) {
  try {
    const { results } = await (await db(env))
      .prepare('SELECT * FROM wiki_pages WHERE published = 1 ORDER BY created_at')
      .all();
    return json({ pages: results.map(rowToPage) });
  } catch (e) {
    return handleError(e);
  }
}
