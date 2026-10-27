// Everything under /admin (pages and API) is MIPOS-only.
import { getAdmin } from '../_lib/auth.js';
import { json } from '../_lib/db.js';

export async function onRequest(context) {
  const { request, env } = context;
  const admin = await getAdmin(request, env);
  if (!admin) {
    return json({ error: 'MIPOS staff login required' }, 401);
  }

  // Block cross-site writes: the browser always sends Origin on POST/DELETE.
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const origin = request.headers.get('Origin');
    if (!origin || new URL(origin).host !== new URL(request.url).host) {
      return json({ error: 'Bad origin' }, 403);
    }
  }

  context.data.admin = admin;
  return context.next();
}
