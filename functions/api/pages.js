// Public: published pages from the editor, plus the ids of built-in pages
// that staff have hidden (so the browser can drop them).
import { db, json, handleError, rowToPage } from '../_lib/db.js';

export async function onRequestGet({ env }) {
  try {
    const { results } = await (await db(env))
      .prepare('SELECT * FROM wiki_pages WHERE published = 1 OR builtin = 1 ORDER BY created_at')
      .all();
    return json({
      pages: results.filter(r => r.published).map(rowToPage),
      hidden: results.filter(r => !r.published).map(r => r.id)
    });
  } catch (e) {
    return handleError(e);
  }
}
