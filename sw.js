// FeedMe Wiki offline support.
// - Pages, scripts, styles and the page list: try the internet first, fall
//   back to the saved copy when offline.
// - Photos and fonts: use the saved copy, refresh it in the background.
// - /admin (staff) and anything on other websites is never touched.
const CACHE = 'feedme-wiki-offline';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameSite = url.origin === self.location.origin;

  if (!sameSite) {
    if (/^fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) event.respondWith(savedFirst(req));
    return;
  }
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/cdn-cgi')) return;

  if (req.mode === 'navigate') {
    // The wiki is one page; ?category= / ?article= are handled in the browser.
    if (url.pathname === '/' || url.pathname === '/index.html') event.respondWith(internetFirst(req, '/'));
    return;
  }
  if (/\.(png|jpe?g|gif|webp|svg|ico)$/i.test(url.pathname) || url.pathname.startsWith('/api/img/')) {
    event.respondWith(savedFirst(req));
    return;
  }
  event.respondWith(internetFirst(req));
});

async function internetFirst(req, key) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) await cache.put(key || req, res.clone());
    return res;
  } catch (e) {
    const saved = await cache.match(key || req);
    if (saved) return saved;
    throw e;
  }
}

async function savedFirst(req) {
  const cache = await caches.open(CACHE);
  const saved = await cache.match(req);
  const update = fetch(req).then(res => {
    if (res.ok || res.type === 'opaque') return cache.put(req, res.clone()).then(() => res);
    return res;
  });
  if (saved) {
    update.catch(() => {});
    return saved;
  }
  return update;
}
