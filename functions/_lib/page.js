// Validates and normalises a page submitted by the editor. Only known fields
// are kept and every string is length-limited; the browser renderer escapes
// all text, so no HTML from the editor ever reaches customers.
import { HttpError } from './db.js';

// Must match category ids in js/data.js
export const CATEGORIES = [
  'menu-setup', 'connect-setup', 'restaurant-operation', 'hrm',
  'pos-setup', 'integration-setup', 'troubleshooting'
];
const TONES = ['red', 'amber', 'blue', 'green', 'purple', 'gray'];

function str(v, max) {
  return typeof v === 'string' ? v.replace(/\r\n/g, '\n').trim().slice(0, max) : '';
}

function list(v, maxItems, fn) {
  return Array.isArray(v) ? v.slice(0, maxItems).map(fn).filter(x => x !== null) : [];
}

function lines(v, maxItems, maxLen) {
  return list(v, maxItems, x => str(x, maxLen) || null);
}

// Scribe "interactive guide" embeds only.
function scribe(v) {
  const s = str(v, 300);
  return /^https:\/\/scribehow\.com\/embed\/[\w-]+(\?[\w=&-]*)?$/.test(s) ? s : '';
}

// Uploaded images, existing site images, or external https links only.
function image(v) {
  const s = str(v, 500);
  if (/^\/api\/img\/[a-z0-9]{6,32}$/.test(s)) return s;
  if (/^(images|img)\/[\w\-./]+\.(png|jpe?g|gif|webp|svg)$/i.test(s) && !s.includes('..')) return s;
  if (/^https:\/\/[^\s"'<>()\\]+$/.test(s)) return s;
  return null;
}

export function normalizePage(input) {
  if (!input || typeof input !== 'object') throw new HttpError(400, 'Invalid page');
  const category = str(input.category, 50);
  if (!CATEGORIES.includes(category)) throw new HttpError(400, 'Please choose a valid category');
  const title = str(input.title, 200);
  if (!title) throw new HttpError(400, 'Title is required');
  // Empty colour = use the category colour
  const color = /^#[0-9a-f]{6}$/i.test(input.color) ? input.color : '';

  return {
    category,
    title,
    description: str(input.description, 500),
    tags: lines(input.tags, 10, 40),
    icon: str(input.icon, 16),
    color,
    scribeEmbed: scribe(input.scribeEmbed),
    steps: Number.isInteger(input.steps) && input.steps > 0 && input.steps < 1000 ? input.steps : undefined,
    duration: str(input.duration, 40) || undefined,
    intro: str(input.intro, 5000),
    published: input.published !== false,
    sections: list(input.sections, 40, s => ({
      style: s && s.style === 'accordion' ? 'accordion' : 'plain',
      title: str(s && s.title, 200),
      subtitle: str(s && s.subtitle, 300),
      icon: str(s && s.icon, 16),
      tone: TONES.includes(s && s.tone) ? s.tone : 'red',
      text: str(s && s.text, 20000),
      causesTitle: str(s && s.causesTitle, 60),
      errors: lines(s && s.errors, 20, 500),
      causes: lines(s && s.causes, 20, 500),
      images: list(s && s.images, 10, image),
      phases: list(s && s.phases, 30, ph => ({
        label: str(ph && ph.label, 30),
        title: str(ph && ph.title, 200),
        restart: !!(ph && ph.restart),
        letters: !!(ph && ph.letters),
        steps: list(ph && ph.steps, 60, st => ({
          title: str(st && st.title, 300),
          text: str(st && st.text, 10000),
          note: str(st && st.note, 2000),
          images: list(st && st.images, 10, image)
        }))
      }))
    }))
  };
}

export function slugify(title) {
  return title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'page';
}
