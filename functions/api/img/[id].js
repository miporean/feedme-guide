// Public: serves an image uploaded through the editor.
import { db, handleError } from '../../_lib/db.js';

export async function onRequestGet({ env, params }) {
  try {
    const row = await (await db(env))
      .prepare('SELECT mime, data FROM wiki_images WHERE id = ?')
      .bind(String(params.id))
      .first();
    if (!row) return new Response('Not found', { status: 404 });
    return new Response(new Uint8Array(row.data), {
      headers: {
        'Content-Type': row.mime,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (e) {
    return handleError(e);
  }
}
