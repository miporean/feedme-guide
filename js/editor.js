// FeedMe Wiki — page editor for MIPOS staff.
// Loaded on demand by app.js only after /admin/api/me confirms a staff login.
// Builds pages in the same layout as the Printer Troubleshooting Guide:
//   intro note → sections (collapsible) → phases → numbered steps with screenshots
(function () {
  'use strict';

  const R = window.WikiRender;
  const esc = R.esc;

  const TONE_NAMES = { red: 'Red', amber: 'Amber', blue: 'Blue', green: 'Green', purple: 'Purple', gray: 'Gray' };
  const SECTION_NAMES = { portal: 'Portal', pos: 'POS', integration: 'Integration', troubleshooting: 'Troubleshooting' };

  let state = null;      // the page being edited
  let opts = null;       // { categories, onSaved }
  let root = null;       // overlay element
  let mode = 'edit';     // 'edit' | 'preview'
  let dirty = false;
  let saving = false;
  let uploading = 0;

  // ---------- blank building blocks ----------
  const blankStep = () => ({ title: '', text: '', note: '', images: [] });
  const blankPhase = n => ({ label: 'Phase ' + n, title: '', restart: false, letters: false, steps: [blankStep()] });
  const blankSection = () => ({ style: 'accordion', title: '', subtitle: '', icon: '', tone: 'red', text: '', errors: [], causes: [], causesTitle: '', images: [], phases: [blankPhase(1)] });
  const BLANKS = { step: blankStep, phase: () => blankPhase(1), section: blankSection };

  // Built-in pages omit empty fields; fill them in so every input has a value.
  function withDefaults(page) {
    const fill = (obj, defaults) => { Object.keys(defaults).forEach(k => { if (obj[k] == null) obj[k] = defaults[k]; }); return obj; };
    fill(page, { title: '', description: '', tags: [], icon: '', color: '', scribeEmbed: '', intro: '', published: true, sections: [] });
    page.sections.forEach(sec => {
      fill(sec, { style: 'plain', title: '', subtitle: '', icon: '', tone: 'red', text: '', errors: [], causes: [], causesTitle: '', images: [], phases: [] });
      sec.phases.forEach(ph => {
        fill(ph, { label: '', title: '', restart: false, letters: false, steps: [] });
        ph.steps.forEach(st => fill(st, { title: '', text: '', note: '', images: [] }));
      });
    });
    return page;
  }

  // Step labels exactly as the page will show them (see page-render.js).
  function stepLabels() {
    const labels = {};
    let n = 0;
    state.sections.forEach((sec, si) => {
      if (sec.style === 'accordion' && sec.title) n = 0;
      sec.phases.forEach((ph, pi) => {
        if (ph.restart) n = 0;
        ph.steps.forEach((st, ti) => {
          labels[`${si}.${pi}.${ti}`] = ph.letters ? String.fromCharCode(65 + (ti % 26)) : ++n;
        });
      });
    });
    return labels;
  }

  // ---------- path helpers ("sections.0.phases.1.title") ----------
  function getPath(path) {
    return path.split('.').reduce((o, k) => (o == null ? o : o[k]), state);
  }
  function setPath(path, value) {
    const keys = path.split('.');
    const last = keys.pop();
    const parent = keys.reduce((o, k) => o[k], state);
    parent[last] = value;
  }
  function parentOf(path) {
    const keys = path.split('.');
    const index = Number(keys.pop());
    return { list: getPath(keys.join('.')), index };
  }

  // ---------- open / close ----------
  function open(options) {
    opts = options;
    state = options.page
      ? JSON.parse(JSON.stringify(options.page))
      : {
          category: options.categoryId || 'troubleshooting',
          title: '',
          description: '',
          tags: [],
          icon: '📄',
          color: '',
          intro: '',
          published: true,
          sections: [blankSection()]
        };
    withDefaults(state);
    mode = 'edit';
    dirty = false;
    saving = false;
    uploading = 0;

    loadCss();
    root = document.createElement('div');
    root.className = 'wke-overlay';
    document.body.appendChild(root);
    document.body.classList.add('wke-open');
    root.addEventListener('input', onInput);
    root.addEventListener('change', onInput);
    root.addEventListener('click', onClick);
    root.addEventListener('dragover', onDragOver);
    root.addEventListener('drop', onDrop);
    document.addEventListener('keydown', onKey);
    window.addEventListener('beforeunload', onBeforeUnload);
    render();
  }

  function close(force) {
    if (!force && dirty && !confirm('You have unsaved changes. Close without saving?')) return;
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('beforeunload', onBeforeUnload);
    closePicker();
    document.body.classList.remove('wke-open');
    if (root) root.remove();
    root = null;
  }

  function onKey(e) {
    if (e.key === 'Escape' && picker) { closePicker(); return; }
    if (e.key === 'Escape') close(false);
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); save(); }
  }

  function onBeforeUnload(e) {
    if (dirty) { e.preventDefault(); e.returnValue = ''; }
  }

  function loadCss() {
    if (document.getElementById('wkeCss')) return;
    const link = document.createElement('link');
    link.id = 'wkeCss';
    link.rel = 'stylesheet';
    link.href = 'css/editor.css?v=11';
    document.head.appendChild(link);
  }

  // ---------- rendering ----------
  function render() {
    const scroll = root.querySelector('.wke-body') ? root.querySelector('.wke-body').scrollTop : 0;
    const isNew = !state.id;
    root.innerHTML = `
      <div class="wke-panel" role="dialog" aria-label="${isNew ? 'New page' : 'Edit page'}">
        <header class="wke-head">
          <div class="wke-head-title">
            <strong>${isNew ? 'New page' : 'Edit page'}</strong>
            <span class="wke-head-sub">${state.builtin
              ? 'Built-in page — you can always undo your changes with “Restore original”'
              : 'Only MIPOS staff can see this editor'}</span>
          </div>
          <div class="wke-tabs" role="tablist">
            <button type="button" data-act="mode" data-mode="edit" aria-pressed="${mode === 'edit'}">Edit</button>
            <button type="button" data-act="mode" data-mode="preview" aria-pressed="${mode === 'preview'}">Preview</button>
          </div>
          <div class="wke-head-actions">
            <label class="wke-publish" title="Untick to keep this page as a draft that customers cannot see">
              <input type="checkbox" data-path="published" data-kind="bool" ${state.published ? 'checked' : ''}>
              Visible to customers
            </label>
            <button type="button" class="wk-btn" data-act="cancel">Cancel</button>
            <button type="button" class="wk-btn wk-btn-primary" data-act="save" ${saving || uploading ? 'disabled' : ''}>
              ${saving ? 'Saving…' : uploading ? 'Uploading…' : 'Save page'}
            </button>
          </div>
        </header>
        <div class="wke-msg" id="wkeMsg" hidden></div>
        <div class="wke-body">
          ${mode === 'edit' ? formHtml() : previewHtml()}
        </div>
      </div>`;
    root.querySelector('.wke-body').scrollTop = scroll;
  }

  function previewHtml() {
    return `
      <div class="article-page wke-preview">
        ${state.published ? '' : '<span class="wk-draft-badge">Hidden — customers cannot see this page</span>'}
        <h1>${esc(state.title || 'Untitled page')}</h1>
        <p class="article-desc">${esc(state.description)}</p>
        <div class="article-content">${R.render(state)}</div>
      </div>`;
  }

  function field(label, path, value, attrs = '', hint = '') {
    return `
      <label class="wke-field">
        <span>${label}</span>
        <input type="text" data-path="${path}" value="${esc(value)}" ${attrs}>
        ${hint ? `<small>${hint}</small>` : ''}
      </label>`;
  }

  // Textareas start tall enough for their content (up to 18 lines).
  function area(label, path, value, attrs = '', hint = '', kind = '', minRows = 2) {
    const rows = Math.min(18, Math.max(minRows, String(value || '').split('\n').length + 1));
    return `
      <label class="wke-field">
        <span>${label}</span>
        <textarea data-path="${path}" rows="${rows}" ${kind ? `data-kind="${kind}"` : ''} ${attrs}>${esc(value)}</textarea>
        ${hint ? `<small>${hint}</small>` : ''}
      </label>`;
  }

  function imagesHtml(path, list, label) {
    return `
      <div class="wke-field">
        <span>${label}</span>
        <div class="wke-images" data-drop="${path}">
          ${(list || []).map((src, i) => `
            <div class="wke-thumb">
              <img src="${esc(src)}" alt="">
              <button type="button" class="wke-thumb-del" data-act="del" data-path="${path}.${i}" title="Remove image">×</button>
            </div>`).join('')}
          <button type="button" class="wke-add-img" data-act="add-img" data-path="${path}">
            <span>+</span> Add screenshot<small>or drag &amp; drop</small>
          </button>
        </div>
      </div>`;
  }

  function tools(path, index, length, what) {
    return `
      <div class="wke-tools">
        <button type="button" data-act="up" data-path="${path}" ${index === 0 ? 'disabled' : ''} title="Move up">↑</button>
        <button type="button" data-act="down" data-path="${path}" ${index === length - 1 ? 'disabled' : ''} title="Move down">↓</button>
        <button type="button" data-act="del" data-path="${path}" data-confirm="Delete this ${what}?" title="Delete ${what}">🗑</button>
      </div>`;
  }

  function categoryColor() {
    const cat = opts.categories.find(c => c.id === state.category);
    return (cat && cat.color) || '#F59E0B';
  }

  function categoryOptions() {
    const groups = {};
    opts.categories.forEach(c => { (groups[c.section] = groups[c.section] || []).push(c); });
    return Object.keys(groups).map(sec => `
      <optgroup label="${esc(SECTION_NAMES[sec] || sec)}">
        ${groups[sec].map(c => `<option value="${esc(c.id)}" ${c.id === state.category ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
      </optgroup>`).join('');
  }

  function formHtml() {
    const labels = stepLabels();
    return `
      <div class="wke-form">
        <section class="wke-card">
          <h3>Page details</h3>
          <div class="wke-grid">
            <label class="wke-field">
              <span>Category</span>
              <select data-path="category">${categoryOptions()}</select>
            </label>
            ${field('Page title *', 'title', state.title, 'placeholder="e.g. Cash Drawer Troubleshooting Guide" maxlength="200"')}
          </div>
          ${area('Short description', 'description', state.description, 'maxlength="500" placeholder="Shown under the title and on the category card"')}
          <div class="wke-grid wke-grid-3">
            ${iconField('Card icon', 'icon', state.icon)}
            <label class="wke-field">
              <span>Card colour</span>
              <input type="color" data-path="color" value="${esc(state.color || categoryColor())}" title="${state.color ? '' : 'Using the category colour'}">
            </label>
            ${field('Search tags', 'tags', (state.tags || []).join(', '), 'data-kind="tags" placeholder="printer, network, LAN"', 'Separate with commas')}
          </div>
          ${field('Interactive guide (Scribe embed link, optional)', 'scribeEmbed', state.scribeEmbed, 'placeholder="https://scribehow.com/embed/…"', 'When set, customers first see the Scribe guide and can switch to “Quick Steps”.')}
          ${area('Intro note (orange box at the top)', 'intro', state.intro, 'placeholder="e.g. 🖨️ Printer not working? Select the error you are seeing below…"', '', '', 1)}
        </section>

        <details class="wke-help">
          <summary><strong>Formatting help</strong> — bold, lists, boxes, tables, links</summary>
          <table>
            <tr><td><code>**bold**</code> · <code>*italic*</code> · <code>\`code\`</code></td><td>text styles</td></tr>
            <tr><td><code>[Guide →](https://…)</code></td><td>link</td></tr>
            <tr><td><code>- item</code> · <code>1. item</code> · <code>a. item</code></td><td>bullet / numbered / lettered list</td></tr>
            <tr><td><code>### Heading</code></td><td>sub-heading</td></tr>
            <tr><td><code>&gt; text</code> · <code>! text</code> · <code>!! text</code></td><td>blue note · orange warning · red alert box</td></tr>
            <tr><td><code>| A | B |</code><br><code>|---|---|</code><br><code>| 1 | 2 |</code></td><td>table (the <code>|---|</code> line makes the first row a header)</td></tr>
          </table>
          <p>A <em>collapsible box</em> section looks like the Printer guide errors. A <em>plain</em> section is a normal heading followed by its content and steps.</p>
        </details>

        ${state.sections.map((sec, si) => sectionHtml(sec, si, labels)).join('')}

        <button type="button" class="wke-add wke-add-section" data-act="add" data-path="sections" data-type="section">
          + Add section
        </button>
      </div>`;
  }

  function sectionHtml(sec, si, labels) {
    const p = `sections.${si}`;
    const box = sec.style === 'accordion';
    return `
      <section class="wke-card wke-section${box ? '' : ' wke-section-plain'}">
        <div class="wke-card-head">
          <h3>Section ${si + 1}${sec.title ? ': ' + esc(sec.title) : ''}</h3>
          ${tools(p, si, state.sections.length, 'section')}
        </div>
        <div class="wke-grid wke-grid-style">
          <label class="wke-field">
            <span>Style</span>
            <select data-path="${p}.style">
              <option value="accordion" ${box ? 'selected' : ''}>Collapsible box</option>
              <option value="plain" ${box ? '' : 'selected'}>Plain heading</option>
            </select>
          </label>
          ${field(box ? 'Box title' : 'Heading (optional)', `${p}.title`, sec.title, `placeholder="${box ? 'e.g. Connection Timed Out / No Route to Host' : 'e.g. Step 1 — Obtain Account Codes'}"`)}
        </div>
        ${box ? `
          <div class="wke-grid wke-grid-sec">
            ${iconField('Icon (optional)', `${p}.icon`, sec.icon)}
            <label class="wke-field">
              <span>Icon colour</span>
              <select data-path="${p}.tone">
                ${Object.keys(TONE_NAMES).map(t => `<option value="${t}" ${t === sec.tone ? 'selected' : ''}>${TONE_NAMES[t]}</option>`).join('')}
              </select>
            </label>
            ${field('One-line summary', `${p}.subtitle`, sec.subtitle, 'placeholder="e.g. Printer cannot reach the network — usually a cable or router issue"')}
          </div>` : ''}
        ${area('Content', `${p}.text`, sec.text, 'placeholder="Paragraphs, lists, boxes or tables shown before the steps (optional)"')}
        ${box || sec.errors.length || sec.causes.length ? `
          <div class="wke-grid">
            ${area('Error messages (one per line)', `${p}.errors`, sec.errors.join('\n'), 'placeholder="SocketException: Connection timed out…"', '', 'lines')}
            <div>
              ${field('Second card heading', `${p}.causesTitle`, sec.causesTitle, 'placeholder="Common Causes"')}
              ${area('Card items (one per line)', `${p}.causes`, sec.causes.join('\n'), 'placeholder="Loose or faulty **LAN cable**"', '', 'lines')}
            </div>
          </div>` : ''}
        ${imagesHtml(`${p}.images`, sec.images, box ? 'Error screenshots' : 'Images')}

        ${sec.phases.map((ph, pi) => phaseHtml(ph, si, pi, sec.phases.length, labels)).join('')}

        <button type="button" class="wke-add" data-act="add" data-path="${p}.phases" data-type="phase">+ Add ${sec.phases.length ? 'phase' : 'steps'}</button>
      </section>`;
  }

  function phaseHtml(ph, si, pi, count, labels) {
    const p = `sections.${si}.phases.${pi}`;
    return `
      <div class="wke-phase">
        <div class="wke-card-head">
          <h4>${ph.label || ph.title ? 'Phase ' + (pi + 1) : 'Steps'}</h4>
          ${tools(p, pi, count, 'phase')}
        </div>
        <div class="wke-grid wke-grid-phase">
          ${field('Badge (optional)', `${p}.label`, ph.label, 'maxlength="30" placeholder="Phase 1"')}
          ${field('Phase title (optional)', `${p}.title`, ph.title, 'placeholder="e.g. Hardware Check"')}
          <div>
            <label class="wke-check">
              <input type="checkbox" data-path="${p}.restart" data-kind="bool" ${ph.restart ? 'checked' : ''}>
              Restart numbers at 1
            </label>
            <label class="wke-check">
              <input type="checkbox" data-path="${p}.letters" data-kind="bool" ${ph.letters ? 'checked' : ''}>
              Use letters (A, B, C)
            </label>
          </div>
        </div>
        ${ph.steps.map((st, ti) => stepHtml(st, `${p}.steps.${ti}`, labels[`${si}.${pi}.${ti}`], ti, ph.steps.length)).join('')}
        <button type="button" class="wke-add" data-act="add" data-path="${p}.steps" data-type="step">+ Add step</button>
      </div>`;
  }

  function stepHtml(st, p, num, ti, count) {
    return `
      <div class="wke-step">
        <div class="wke-step-num">${num}</div>
        <div class="wke-step-body">
          <div class="wke-card-head">
            ${field('Step title', `${p}.title`, st.title, 'placeholder="e.g. Restart the printer and the router"')}
            ${tools(p, ti, count, 'step')}
          </div>
          ${area('Instructions', `${p}.text`, st.text, 'placeholder="Power off both devices, wait **10 seconds**, then power them back on."', '', '', 3)}
          ${area('Info box (optional, blue)', `${p}.note`, st.note, 'placeholder="e.g. IP rules: change only the last number…"', '', '', 1)}
          ${imagesHtml(`${p}.images`, st.images, 'Screenshots')}
        </div>
      </div>`;
  }

  // ---------- events ----------
  function onInput(e) {
    const el = e.target;
    const path = el.getAttribute('data-path');
    if (!path) return;
    const kind = el.getAttribute('data-kind');
    let value;
    if (kind === 'bool') value = el.checked;
    else if (kind === 'lines') value = el.value.split('\n').map(s => s.trim()).filter(Boolean);
    else if (kind === 'tags') value = el.value.split(',').map(s => s.trim()).filter(Boolean);
    else value = el.value;
    setPath(path, value);
    dirty = true;
    // Selects/checkboxes can change headings or numbering — redraw on change.
    if (e.type === 'change' && (el.tagName === 'SELECT' || kind === 'bool')) render();
  }

  function onClick(e) {
    const btn = e.target.closest('[data-act]');
    if (!btn || btn.disabled) return;
    const act = btn.getAttribute('data-act');
    const path = btn.getAttribute('data-path');

    if (act === 'mode') { mode = btn.getAttribute('data-mode'); render(); return; }
    if (act === 'cancel') { close(false); return; }
    if (act === 'save') { save(); return; }
    if (act === 'add-img') { pickImages(path); return; }
    if (act === 'icon') { openPicker(btn, path); return; }

    if (act === 'add') {
      const list = getPath(path);
      const type = btn.getAttribute('data-type');
      const item = BLANKS[type]();
      if (type === 'phase') item.label = list.length ? 'Phase ' + (list.length + 1) : '';
      list.push(item);
    } else if (act === 'del') {
      const msg = btn.getAttribute('data-confirm');
      if (msg && !confirm(msg)) return;
      const { list, index } = parentOf(path);
      list.splice(index, 1);
    } else if (act === 'up' || act === 'down') {
      const { list, index } = parentOf(path);
      const to = act === 'up' ? index - 1 : index + 1;
      if (to < 0 || to >= list.length) return;
      [list[index], list[to]] = [list[to], list[index]];
    } else {
      return;
    }
    dirty = true;
    render();
  }

  function onDragOver(e) {
    if (e.target.closest('[data-drop]')) e.preventDefault();
  }

  function onDrop(e) {
    const zone = e.target.closest('[data-drop]');
    if (!zone) return;
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith('image/'));
    if (files.length) uploadAll(zone.getAttribute('data-drop'), files);
  }

  function pickImages(path) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/jpeg,image/webp,image/gif';
    input.multiple = true;
    input.onchange = () => uploadAll(path, Array.from(input.files || []));
    input.click();
  }

  // ---------- images ----------
  // Screenshots are shrunk in the browser (max 1600px, WebP) before upload.
  async function shrink(file, max = 1600) {
    if (file.type === 'image/gif') return file;
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error('Could not read ' + file.name));
        i.src = url;
      });
      const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      const toBlob = type => new Promise(r => canvas.toBlob(r, type, 0.85));
      let blob = await toBlob('image/webp');
      if (!blob || blob.type !== 'image/webp') blob = await toBlob('image/jpeg');
      return blob && blob.size < file.size ? blob : file;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function uploadBlob(blob) {
    const res = await fetch('/admin/api/images', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': blob.type },
      body: blob
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Upload failed (' + res.status + ')');
    return data.url;
  }

  async function uploadAll(path, files) {
    for (const file of files) {
      uploading++;
      render();
      try {
        const url = await uploadBlob(await shrink(file));
        if (!root) return; // editor closed meanwhile
        getPath(path).push(url);
        dirty = true;
      } catch (err) {
        showMsg(err.message, true);
      } finally {
        uploading--;
        if (root) render();
      }
    }
  }

  // ---------- icon picker (Emoji / Upload / Remove) ----------
  // Each group: [name, tab icon, "emoji keywords;emoji keywords;…"]
  const EMOJI = [
    ['Smileys & People', '😀', '😀 smile happy;😃 smile;😄 laugh;😁 grin;😅 sweat;😂 joy laugh;🙂 smile;😉 wink;😊 blush;😍 love;🤩 star;😎 cool;🤔 think;🤨 doubt;😐 neutral;😴 sleep;😷 sick mask;🤯 mind blown;😕 confused;😟 worried;😮 surprised;😢 cry sad;😭 cry;😡 angry;🤗 hug;🤫 quiet;🤝 handshake deal;👍 thumbs up ok yes;👎 thumbs down no;👌 ok;✌️ peace;🤞 fingers crossed;👉 point right;👈 point left;👆 point up;👇 point down;☝️ point;✋ hand stop;👋 wave hello;👏 clap;🙌 celebrate;🙏 please thanks;💪 strong;👀 eyes look;👤 user person;👥 users people team;🧑‍💼 staff manager;🧑‍🍳 chef cook;🧑‍💻 developer;🧑‍🔧 technician;🙋 question;🤷 unsure;🚶 walk;🏃 run'],
    ['Food & Drink', '🍔', '🍔 burger food;🍟 fries;🍕 pizza;🌭 hotdog;🥪 sandwich;🌮 taco;🍜 noodle ramen;🍝 pasta;🍛 curry rice;🍚 rice;🍱 bento;🍣 sushi;🍤 prawn;🥟 dumpling;🍗 chicken;🍖 meat;🥩 steak;🥓 bacon;🍳 egg cook;🥗 salad;🍲 soup pot;🥘 dish;🍞 bread;🥐 croissant;🧇 waffle;🥞 pancake;🍰 cake;🎂 birthday cake;🧁 cupcake;🍩 donut;🍪 cookie;🍫 chocolate;🍦 ice cream;🍎 apple fruit;🍊 orange;🍌 banana;🍉 watermelon;🍓 strawberry;🥑 avocado;🥕 carrot;🌶️ chili spicy;☕ coffee;🍵 tea;🧋 bubble tea boba;🥤 drink cup;🧃 juice;🥛 milk;🍺 beer;🍷 wine;🍹 cocktail;🧊 ice;🍽️ dining plate restaurant;🥢 chopsticks;🍴 cutlery fork'],
    ['Objects & Tech', '🖨️', '🖨️ printer print;🧾 receipt bill;💵 cash money;💳 card payment credit;💰 money bag;🪙 coin;🏦 bank;💸 pay;🏷️ tag price label;🛒 cart shop;🛍️ shopping;📦 box package stock inventory;🚚 delivery truck;🛵 rider delivery;📱 phone mobile tablet pos;💻 laptop;🖥️ desktop computer monitor;⌨️ keyboard;🖱️ mouse;🔌 plug power cable;🔋 battery;📶 wifi signal network;🌐 internet web globe;📡 antenna;🛜 wireless router;💾 save disk;📀 disc;🔍 search find;🔎 zoom;🔑 key password;🗝️ key;🔒 lock secure;🔓 unlock;🛡️ shield security;⚙️ settings gear;🔧 wrench fix tool;🛠️ tools repair;🔨 hammer;🧰 toolbox;🪛 screwdriver;🧲 magnet;💡 idea tip bulb;🔦 torch;📷 camera photo;📸 photo;🖼️ picture image;🎥 video;📺 tv screen;🔊 sound speaker;🔔 bell notification;📣 announce;📢 loudspeaker;⏱️ timer stopwatch;⏰ alarm clock;🕒 time clock;⌛ hourglass wait;📅 calendar date;🗓️ schedule;📆 calendar;📊 chart report;📈 growth sales;📉 decline;📋 clipboard list;📝 note edit write;✏️ pencil edit;🖊️ pen;📌 pin;📍 location;📎 attachment clip;✂️ cut;📁 folder;📂 open folder;🗂️ files;📄 page document;📃 document;📑 tabs;📚 books guide;📖 book manual;🗒️ notepad;📧 email;✉️ mail;📨 inbox;📮 mailbox;🏪 shop store;🏬 mall;🏢 office;🏠 home;🪑 chair;🚪 door;🎁 gift voucher;🎟️ ticket;🎫 coupon;🧮 abacus calculate;🧪 test;🔗 link'],
    ['Symbols', '✅', '✅ check done yes;☑️ check;✔️ tick;❌ cross no wrong;❎ cancel;⚠️ warning alert;🚫 forbidden blocked;⛔ stop no entry;❗ important;❕ exclamation;❓ question;❔ help;ℹ️ info information;🆕 new;🆗 ok;🆙 up;🔝 top;🔄 refresh sync reload;🔃 reload;🔁 repeat;↩️ undo back;↪️ redo;⬆️ up arrow;⬇️ down arrow;⬅️ left arrow;➡️ right arrow;↗️ arrow;🔼 up;🔽 down;▶️ play start;⏸️ pause;⏹️ stop;⏏️ eject;➕ plus add;➖ minus;✖️ multiply;➗ divide;💯 hundred;🔢 numbers;🔤 letters;#️⃣ number hash;*️⃣ star;0️⃣ zero;1️⃣ one;2️⃣ two;3️⃣ three;4️⃣ four;5️⃣ five;🔴 red circle;🟠 orange;🟡 yellow;🟢 green;🔵 blue;🟣 purple;⚫ black;⚪ white;🟥 red square;🟧 orange square;🟨 yellow square;🟩 green square;🟦 blue square;⭐ star favourite;🌟 star shine;✨ sparkle new;🔥 fire hot popular;💥 boom;⚡ lightning fast power;❤️ heart love;💔 broken;♻️ recycle;🏁 finish;🚩 flag;🎯 target goal;🏆 trophy;🥇 first medal;🎉 party celebrate;🎊 confetti;©️ copyright;®️ registered;™️ trademark'],
    ['Nature & Travel', '🌿', '🌿 leaf plant;🌱 seedling;🌳 tree;🌸 flower;🌹 rose;🌻 sunflower;🍀 clover luck;🍁 maple;☀️ sun;🌙 moon night;⛅ cloud;🌧️ rain;⛈️ storm;❄️ snow cold;🌈 rainbow;💧 water drop;🌊 wave;🌍 world earth;🗺️ map;🧭 compass;🏔️ mountain;🏖️ beach;🏝️ island;🚗 car;🚕 taxi;🚌 bus;🚲 bicycle;🏍️ motorcycle;✈️ plane flight;🚀 rocket launch;⛽ fuel;🚦 traffic light;🅿️ parking;🐶 dog;🐱 cat;🐟 fish;🐔 chicken;🐄 cow;🐷 pig;🦐 shrimp;🦀 crab'],
    ['Flags', '🏳️', '🇲🇾 malaysia;🇸🇬 singapore;🇮🇩 indonesia;🇹🇭 thailand;🇵🇭 philippines;🇻🇳 vietnam;🇨🇳 china;🇭🇰 hong kong;🇹🇼 taiwan;🇯🇵 japan;🇰🇷 korea;🇮🇳 india;🇦🇺 australia;🇬🇧 uk britain;🇺🇸 usa america;🏳️ white flag;🏴 black flag']
  ].map(([name, tab, list]) => ({
    name, tab,
    items: list.split(';').map(s => { const i = s.indexOf(' '); return { e: s.slice(0, i), k: (name + ' ' + s.slice(i + 1)).toLowerCase() }; })
  }));

  let picker = null;

  function iconField(label, path, value) {
    return `
      <div class="wke-field">
        <span>${label}</span>
        <button type="button" class="wke-icon-btn" data-act="icon" data-path="${path}" title="Choose an icon">
          ${value ? `<span class="wke-icon-cur">${R.icon(value)}</span>` : '<span class="wke-icon-empty">＋ Add icon</span>'}
        </button>
      </div>`;
  }

  function recentIcons() {
    try { return JSON.parse(localStorage.getItem('wikiRecentIcons') || '[]').slice(0, 16); } catch (e) { return []; }
  }

  function setIcon(path, value) {
    setPath(path, value);
    if (value) {
      try { localStorage.setItem('wikiRecentIcons', JSON.stringify([value, ...recentIcons().filter(v => v !== value)].slice(0, 16))); } catch (e) {}
    }
    dirty = true;
    closePicker();
    render();
  }

  function closePicker() {
    if (!picker) return;
    if (picker.cleanup) picker.cleanup();
    picker.remove();
    picker = null;
    document.removeEventListener('mousedown', outsidePicker, true);
  }

  function outsidePicker(e) {
    if (picker && !picker.contains(e.target) && !e.target.closest('[data-act="icon"]')) closePicker();
  }

  function emojiGrid(query) {
    const q = query.trim().toLowerCase();
    const cell = v => `<button type="button" class="wke-pick-cell" data-pick="${esc(v)}" title="${esc(v)}">${R.icon(v)}</button>`;
    if (q) {
      const found = EMOJI.flatMap(g => g.items).filter(it => it.k.includes(q));
      return found.length
        ? `<div class="wke-pick-cells">${found.map(it => cell(it.e)).join('')}</div>`
        : '<p class="wke-pick-empty">No emoji found. Try another word, or upload your own image.</p>';
    }
    const recent = recentIcons();
    return (recent.length ? `<h4 data-group="recent">Recent</h4><div class="wke-pick-cells">${recent.map(cell).join('')}</div>` : '') +
      EMOJI.map((g, i) => `<h4 data-group="${i}">${g.name}</h4><div class="wke-pick-cells">${g.items.map(it => cell(it.e)).join('')}</div>`).join('');
  }

  function openPicker(btn, path) {
    if (picker && picker.dataset.path === path) { closePicker(); return; }
    closePicker();
    picker = document.createElement('div');
    picker.className = 'wke-picker';
    picker.dataset.path = path;
    let tab = 'emoji';

    const draw = () => {
      picker.innerHTML = `
        <div class="wke-pick-head">
          <button type="button" data-tab="emoji" aria-pressed="${tab === 'emoji'}">Emoji</button>
          <button type="button" data-tab="upload" aria-pressed="${tab === 'upload'}">Upload</button>
          <button type="button" class="wke-pick-remove" data-pick="">Remove</button>
        </div>
        ${tab === 'emoji' ? `
          <div class="wke-pick-search"><input type="search" placeholder="Filter… e.g. printer, cash, wifi" aria-label="Filter emoji"></div>
          <div class="wke-pick-body"></div>
          <div class="wke-pick-tabs">
            ${recentIcons().length ? '<button type="button" data-jump="recent" title="Recent">🕘</button>' : ''}
            ${EMOJI.map((g, i) => `<button type="button" data-jump="${i}" title="${g.name}">${g.tab}</button>`).join('')}
          </div>` : `
          <div class="wke-pick-upload" data-icon-drop>
            <button type="button" class="wk-btn wk-btn-primary" data-upload-icon>Upload an image</button>
            <p>or drag an image here</p>
            <small>A square image works best, e.g. a logo. PNG, JPG, WebP or GIF.</small>
            <p class="wke-pick-status" hidden></p>
          </div>`}`;
      if (tab === 'emoji') {
        const body = picker.querySelector('.wke-pick-body');
        const input = picker.querySelector('input');
        body.innerHTML = emojiGrid('');
        input.addEventListener('input', () => { body.innerHTML = emojiGrid(input.value); body.scrollTop = 0; });
        input.focus();
      }
    };

    const upload = async file => {
      if (!file || !file.type.startsWith('image/')) return;
      const status = picker.querySelector('.wke-pick-status');
      status.hidden = false;
      status.textContent = 'Uploading…';
      try {
        setIcon(path, await uploadBlob(await shrink(file, 256)));
      } catch (err) {
        if (picker) status.textContent = err.message;
      }
    };

    picker.addEventListener('click', e => {
      const t = e.target.closest('button');
      if (!t) return;
      if (t.hasAttribute('data-tab')) { tab = t.getAttribute('data-tab'); draw(); return; }
      if (t.hasAttribute('data-pick')) { setIcon(path, t.getAttribute('data-pick')); return; }
      if (t.hasAttribute('data-jump')) {
        const h = picker.querySelector(`[data-group="${t.getAttribute('data-jump')}"]`);
        if (h) picker.querySelector('.wke-pick-body').scrollTop = h.offsetTop - picker.querySelector('.wke-pick-body').offsetTop;
        return;
      }
      if (t.hasAttribute('data-upload-icon')) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png,image/jpeg,image/webp,image/gif';
        input.onchange = () => upload(input.files[0]);
        input.click();
      }
    });
    picker.addEventListener('dragover', e => { if (e.target.closest('[data-icon-drop]')) e.preventDefault(); });
    picker.addEventListener('drop', e => {
      if (!e.target.closest('[data-icon-drop]')) return;
      e.preventDefault();
      upload((e.dataTransfer.files || [])[0]);
    });

    document.body.appendChild(picker);
    draw();

    // Place under the button (or above it when there is no room below), and
    // follow it when the editor scrolls.
    const place = () => {
      if (!picker) return;
      const r = btn.getBoundingClientRect();
      const w = picker.offsetWidth, h = picker.offsetHeight;
      picker.style.left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8)) + 'px';
      picker.style.top = (r.bottom + 6 + h > window.innerHeight ? Math.max(8, r.top - h - 6) : r.bottom + 6) + 'px';
    };
    place();
    const body = root.querySelector('.wke-body');
    if (body) body.addEventListener('scroll', place, { passive: true });
    window.addEventListener('resize', place);
    picker.cleanup = () => {
      if (body) body.removeEventListener('scroll', place);
      window.removeEventListener('resize', place);
    };
    document.addEventListener('mousedown', outsidePicker, true);
  }

  // ---------- save ----------
  function showMsg(text, isError) {
    const el = root && root.querySelector('#wkeMsg');
    if (!el) return;
    el.textContent = text;
    el.className = 'wke-msg' + (isError ? ' wke-msg-error' : '');
    el.hidden = false;
  }

  async function save() {
    if (saving || uploading) return;
    if (!state.title || !state.title.trim()) {
      mode = 'edit';
      render();
      showMsg('Please enter a page title.', true);
      const t = root.querySelector('[data-path="title"]');
      if (t) t.focus();
      return;
    }
    saving = true;
    render();
    try {
      const res = await fetch('/admin/api/pages', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) throw new Error('Your MIPOS login has expired. Open /admin in a new tab to log in again, then click Save.');
      if (!res.ok) throw new Error(data.error || 'Save failed (' + res.status + ')');
      dirty = false;
      saving = false;
      close(true);
      opts.onSaved(data.page);
    } catch (err) {
      saving = false;
      render();
      showMsg(err.message, true);
    }
  }

  window.WikiEditor = { open };
})();
