// "Download app": saves every guide and photo on the device so the wiki works
// without internet, then offers to install it on the home screen.
(function () {
  'use strict';

  const CACHE = 'feedme-wiki-offline'; // must match sw.js
  if (!('serviceWorker' in navigator) || !window.caches) return;

  navigator.serviceWorker.register('/sw.js').catch(() => {});

  let installPrompt = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    installPrompt = e;
  });
  window.addEventListener('appinstalled', () => { installPrompt = null; });

  const isApp = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const saved = () => { try { return localStorage.getItem('wikiOffline') === '1'; } catch (e) { return false; } };

  // ---- Everything the wiki needs offline
  function collectImages(obj, out) {
    if (typeof obj === 'string') {
      if (/^(\/api\/img\/[a-z0-9]+|\/?(images|img)\/[\w\-./]+\.(png|jpe?g|gif|webp|svg))$/i.test(obj)) out.add(new URL(obj, location.origin).href);
    } else if (obj && typeof obj === 'object') {
      Object.values(obj).forEach(v => collectImages(v, out));
    }
  }

  async function fileList() {
    const urls = new Set([location.origin + '/', location.origin + '/manifest.webmanifest', location.origin + '/api/pages']);
    document.querySelectorAll('script[src], link[rel="stylesheet"][href], link[rel~="icon"][href], link[rel="apple-touch-icon"][href], img[src]').forEach(el => {
      const u = new URL(el.getAttribute('src') || el.getAttribute('href'), location.href);
      if (u.origin === location.origin || u.hostname === 'fonts.googleapis.com') urls.add(u.href);
    });
    ['/img/wiki-icon-192.png', '/img/wiki-icon-512.png'].forEach(p => urls.add(location.origin + p));
    if (typeof SITE_DATA !== 'undefined') collectImages(SITE_DATA, urls);
    try {
      const res = await fetch('/api/pages', { cache: 'no-store' });
      if (res.ok) collectImages(await res.json(), urls);
    } catch (e) { /* offline: keep what we have */ }
    return [...urls];
  }

  // Google Fonts: the stylesheet points at the font files, save those too.
  async function fontFiles(cache, cssUrl) {
    const res = await cache.match(cssUrl);
    if (!res) return [];
    const css = await res.clone().text();
    return [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1]);
  }

  async function saveAll(onProgress, onlyMissing) {
    const cache = await caches.open(CACHE);
    let urls = await fileList();
    let done = 0, failed = 0, bytes = 0;

    async function save(url) {
      try {
        const isPhoto = /\.(png|jpe?g|gif|webp|svg)$|\/api\/img\//i.test(url);
        if (onlyMissing && isPhoto && await cache.match(url)) return;
        const cross = !url.startsWith(location.origin);
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 20000); // one slow file must not freeze the download
        const res = await fetch(url, cross ? { mode: 'no-cors', signal: ctrl.signal } : { cache: 'no-cache', signal: ctrl.signal })
          .finally(() => clearTimeout(timer));
        if (!res.ok && res.type !== 'opaque') throw new Error(res.status);
        const blob = await res.clone().blob();
        bytes += blob.size;
        await cache.put(url === location.origin + '/' ? '/' : url, res);
      } catch (e) {
        failed++;
      } finally {
        done++;
        onProgress && onProgress(done, urls.length);
      }
    }

    async function run(list) {
      const queue = list.slice();
      await Promise.all(Array.from({ length: 4 }, async () => {
        while (queue.length) await save(queue.shift());
      }));
    }

    await run(urls);
    const fontCss = urls.filter(u => u.includes('fonts.googleapis.com'));
    for (const css of fontCss) {
      const fonts = await fontFiles(cache, css).catch(() => []);
      urls = urls.concat(fonts);
      await run(fonts);
    }
    return { total: urls.length, failed, bytes };
  }

  // ---- Dialog
  let dialog = null;
  function openDialog() {
    if (dialog) dialog.remove();
    dialog = document.createElement('div');
    dialog.className = 'wk-dl-overlay';
    dialog.innerHTML = `
      <div class="wk-dl-box" role="dialog" aria-modal="true" aria-labelledby="wkDlTitle">
        <button type="button" class="wk-dl-close" aria-label="Close">✕</button>
        <img src="/img/wiki-icon-192.png" alt="" width="56" height="56" class="wk-dl-icon">
        <h2 id="wkDlTitle">Download FeedMe Wiki</h2>
        <p class="wk-dl-text">Saving every guide and photo on this device, so you can use it without internet.</p>
        <div class="wk-dl-bar"><div class="wk-dl-fill"></div></div>
        <p class="wk-dl-status">Getting ready…</p>
        <div class="wk-dl-install"></div>
      </div>`;
    document.body.appendChild(dialog);
    const close = () => { dialog.remove(); dialog = null; };
    dialog.querySelector('.wk-dl-close').addEventListener('click', close);
    dialog.addEventListener('click', e => { if (e.target === dialog) close(); });
    return dialog;
  }

  function installHelp(box) {
    const el = box.querySelector('.wk-dl-install');
    if (isApp()) {
      el.innerHTML = '<p>You are using the app. Guides update automatically whenever you are online.</p>';
    } else if (installPrompt) {
      el.innerHTML = '<p>Add it to your home screen to open it like an app:</p><button type="button" class="wk-btn wk-btn-primary">📲 Install app</button>';
      el.querySelector('button').addEventListener('click', async () => {
        const p = installPrompt;
        installPrompt = null;
        p.prompt();
        const choice = await p.userChoice.catch(() => ({}));
        el.innerHTML = choice.outcome === 'accepted'
          ? '<p>✓ Installed. Open <strong>FeedMe Wiki</strong> from your home screen.</p>'
          : '<p>You can still open this website without internet in this browser.</p>';
      });
    } else if (isIOS()) {
      el.innerHTML = '<p>To add it to your home screen: tap <strong>Share</strong> <span class="wk-dl-share">⬆</span> at the bottom of Safari, then <strong>Add to Home Screen</strong>.</p>';
    } else {
      el.innerHTML = '<p>To add it to your home screen, open your browser menu (⋮) and choose <strong>Install app</strong> or <strong>Add to Home screen</strong>. You can also just open this website without internet in this browser.</p>';
    }
  }

  async function download() {
    const box = openDialog();
    const fill = box.querySelector('.wk-dl-fill');
    const status = box.querySelector('.wk-dl-status');
    if (!navigator.onLine) {
      status.textContent = 'You are offline. Connect to the internet and try again.';
      box.classList.add('wk-dl-error');
      return;
    }
    try {
      await navigator.serviceWorker.ready;
      const result = await saveAll((done, total) => {
        fill.style.width = Math.round(done / total * 100) + '%';
        status.textContent = `Saving ${done} of ${total} files…`;
      });
      fill.style.width = '100%';
      const mb = (result.bytes / 1048576).toFixed(1);
      if (result.failed) {
        status.textContent = `Saved, but ${result.failed} file${result.failed === 1 ? '' : 's'} could not be downloaded. Check your internet and press Download again.`;
        box.classList.add('wk-dl-error');
      } else {
        status.textContent = `✓ All guides and photos saved (${mb} MB). This works without internet now.`;
        box.classList.add('wk-dl-done');
      }
      try { localStorage.setItem('wikiOffline', '1'); } catch (e) {}
      updateButton();
      installHelp(box);
    } catch (e) {
      status.textContent = 'Download failed: ' + e.message;
      box.classList.add('wk-dl-error');
    }
  }

  // ---- Button in the top menu
  const nav = document.getElementById('nav');
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'wk-dl-btn';
  btn.id = 'wkDownload';
  nav.appendChild(btn);
  // Shown in the browser; hidden inside the installed app. Saved copies
  // update automatically, so there is no "update" button.
  function updateButton() {
    btn.innerHTML = '📥 Download app';
    btn.title = 'Save all guides and photos to use without internet';
    btn.hidden = isApp();
    if (window.wikiFitHeader) window.wikiFitHeader();
  }
  updateButton();
  btn.addEventListener('click', () => {
    nav.classList.remove('open');
    const menuBtn = document.getElementById('mobileMenuBtn');
    if (menuBtn) menuBtn.textContent = '☰';
    download();
  });

  // Keep the saved copy up to date automatically: whenever the wiki is opened,
  // comes back online, or is brought back to the screen (at most every 10 min),
  // quietly fetch new and changed guides and new photos.
  let syncing = false;
  let lastSync = 0;
  function autoSync() {
    if (!(isApp() || saved()) || !navigator.onLine || syncing) return;
    if (Date.now() - lastSync < 10 * 60 * 1000) return;
    syncing = true;
    lastSync = Date.now();
    navigator.serviceWorker.ready
      .then(() => saveAll(null, true))
      .then(() => { try { localStorage.setItem('wikiOffline', '1'); } catch (e) {} })
      .catch(() => {})
      .finally(() => { syncing = false; });
  }
  window.addEventListener('load', () => setTimeout(autoSync, 3000));
  window.addEventListener('online', () => { lastSync = 0; setTimeout(autoSync, 2000); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') autoSync(); });
})();
