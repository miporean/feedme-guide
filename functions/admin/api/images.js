// Admin: upload one image (raw body). The editor shrinks images before upload.
import { db, json, handleError, randomId, HttpError } from '../../_lib/db.js';

const TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];
const MAX_BYTES = 1.5 * 1024 * 1024; // D1 rows are capped at 2 MB

export async function onRequestPost({ request, env, data }) {
  try {
    const mime = (request.headers.get('Content-Type') || '').split(';')[0].trim();
    if (!TYPES.includes(mime)) throw new HttpError(415, 'Only PNG, JPEG, WebP or GIF images');
    const buf = await request.arrayBuffer();
    if (!buf.byteLength) throw new HttpError(400, 'Empty image');
    if (buf.byteLength > MAX_BYTES) throw new HttpError(413, 'Image is too large (max 1.5 MB after resizing)');

    const id = randomId(16);
    await (await db(env))
      .prepare('INSERT INTO wiki_images (id, mime, data, size, created_at, created_by) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(id, mime, buf, buf.byteLength, new Date().toISOString(), data.admin.email)
      .run();
    return json({ id, url: `/api/img/${id}` });
  } catch (e) {
    return handleError(e);
  }
}
