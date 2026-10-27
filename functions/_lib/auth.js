// Verifies a Cloudflare Access JWT (same approach as the RMA app).
// The token arrives in the `Cf-Access-Jwt-Assertion` header or the
// `CF_Authorization` cookie. Signing keys live at
// https://<team>.cloudflareaccess.com/cdn-cgi/access/certs
//
// This check runs in addition to the Access application in front of /admin:
// the site is also reachable on other hostnames (e.g. feedme.mipos.me, *.pages.dev)
// that may not be behind Access, so the Function itself must refuse anyone
// without a valid token for OUR Access app (CF_ACCESS_AUD is required).

let cachedCerts = null;

async function getCerts(team) {
  const now = Date.now();
  if (cachedCerts && cachedCerts.team === team && cachedCerts.expiresAt > now) return cachedCerts.keys;
  const res = await fetch(`https://${team}.cloudflareaccess.com/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`failed to fetch Access certs (${res.status})`);
  const data = await res.json();
  cachedCerts = { team, keys: data.keys, expiresAt: now + 60 * 60 * 1000 };
  return data.keys;
}

function b64urlToBytes(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function verifyAccessJwt(token, team, aud) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('malformed token');
  const [h, p, s] = parts;
  const header = JSON.parse(new TextDecoder().decode(b64urlToBytes(h)));
  if (header.alg !== 'RS256') throw new Error('unexpected alg');

  const jwk = (await getCerts(team)).find(k => k.kid === header.kid);
  if (!jwk) throw new Error('signing key not found');
  const key = await crypto.subtle.importKey(
    'jwk', { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: jwk.alg, ext: true },
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']
  );
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlToBytes(s), new TextEncoder().encode(`${h}.${p}`));
  if (!ok) throw new Error('bad signature');

  const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
  if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error('token expired');
  const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!auds.includes(aud)) throw new Error('bad audience');
  if (!payload.email) throw new Error('no email in token');
  return payload;
}

function getCookie(request, name) {
  const cookie = request.headers.get('Cookie') || '';
  const m = cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? m[1] : null;
}

// Returns { email } for a signed-in MIPOS admin, or null.
export async function getAdmin(request, env) {
  const host = new URL(request.url).hostname;

  // Local development only (wrangler pages dev): DEV_ADMIN_EMAIL in .dev.vars.
  if (env.DEV_ADMIN_EMAIL && (host === 'localhost' || host === '127.0.0.1')) {
    return { email: env.DEV_ADMIN_EMAIL };
  }

  // Fail closed: without both settings nobody is an admin.
  if (!env.CF_ACCESS_TEAM || !env.CF_ACCESS_AUD) return null;

  const token = request.headers.get('Cf-Access-Jwt-Assertion') || getCookie(request, 'CF_Authorization');
  if (!token) return null;
  try {
    const payload = await verifyAccessJwt(token, env.CF_ACCESS_TEAM, env.CF_ACCESS_AUD);
    const email = String(payload.email).toLowerCase();
    // Optional extra allow-list, e.g. "@mipos.me,boss@gmail.com"
    if (env.ADMIN_EMAILS) {
      const allowed = env.ADMIN_EMAILS.toLowerCase().split(',').map(x => x.trim()).filter(Boolean);
      if (!allowed.some(a => (a.startsWith('@') ? email.endsWith(a) : email === a))) return null;
    }
    return { email };
  } catch (e) {
    return null;
  }
}
