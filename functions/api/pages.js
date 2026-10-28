// Public: published pages from the editor, the ids of built-in pages that
// staff have hidden or deleted (so the browser can drop them), and the ids of
// deleted categories.
import { db, json, handleError, rowToPage, getDeleted } from '../_lib/db.js';

export async function onRequestGet({ env }) {
  try {
    const DB = await db(env);
    const deleted = await getDeleted(DB);
    const { results } = await DB
      .prepare('SELECT * FROM wiki_pages WHERE published = 1 OR builtin = 1 ORDER BY created_at')
      .all();
    const live = results.filter(r => !deleted.pages.has(r.id));
    return json({
      pages: live.filter(r => r.published).map(rowToPage),
      hidden: [...live.filter(r => !r.published).map(r => r.id), ...deleted.pages],
      deletedCategories: deleted.categories
    });
  } catch (e) {
    return handleError(e);
  }
}
