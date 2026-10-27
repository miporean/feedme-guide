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
  const blankPhase = n => ({ label: 'Phase ' + n, title: '', restart: false, steps: [blankStep()] });
  const blankSection = () => ({ title: '', subtitle: '', icon: '⚠️', tone: 'red', errors: [], causes: [], images: [], phases: [blankPhase(1)] });
  const BLANKS = { step: blankStep, phase: () => blankPhase(1), section: blankSection };

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
          color: '#F59E0B',
          intro: '',
          published: true,
          sections: [blankSection()]
        };
    if (!state.sections) state.sections = [];
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
    document.body.classList.remove('wke-open');
    if (root) root.remove();
    root = null;
  }

  function onKey(e) {
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
    link.href = 'css/editor.css?v=1';
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
            <span class="wke-head-sub">Only MIPOS staff can see this editor</span>
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
        ${state.published ? '' : '<span class="wk-draft-badge">Draft — customers cannot see this page</span>'}
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

  function area(label, path, value, attrs = '', hint = '', kind = '') {
    return `
      <label class="wke-field">
        <span>${label}</span>
        <textarea data-path="${path}" ${kind ? `data-kind="${kind}"` : ''} ${attrs}>${esc(value)}</textarea>
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

  function categoryOptions() {
    const groups = {};
    opts.categories.forEach(c => { (groups[c.section] = groups[c.section] || []).push(c); });
    return Object.keys(groups).map(sec => `
      <optgroup label="${esc(SECTION_NAMES[sec] || sec)}">
        ${groups[sec].map(c => `<option value="${esc(c.id)}" ${c.id === state.category ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
      </optgroup>`).join('');
  }

  function formHtml() {
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
          ${area('Short description', 'description', state.description, 'rows="2" maxlength="500" placeholder="Shown under the title and on the category card"')}
          <div class="wke-grid wke-grid-3">
            ${field('Card icon (emoji)', 'icon', state.icon, 'maxlength="16" placeholder="🖨️"')}
            <label class="wke-field">
              <span>Card colour</span>
              <input type="color" data-path="color" value="${esc(state.color || '#F59E0B')}">
            </label>
            ${field('Search tags', 'tags', (state.tags || []).join(', '), 'data-kind="tags" placeholder="printer, network, LAN"', 'Separate with commas')}
          </div>
          ${area('Intro note (orange box at the top)', 'intro', state.intro, 'rows="2" placeholder="e.g. 🖨️ Printer not working? Select the error you are seeing below…"')}
        </section>

        <p class="wke-help">
          <strong>Formatting:</strong> <code>**bold**</code> · <code>\`code\`</code> ·
          start a line with <code>- </code> for bullets or <code>1. </code> for a numbered list.
          Leave a <em>section title</em> empty to show its steps directly, without the drop-down.
        </p>

        ${state.sections.map((sec, si) => sectionHtml(sec, si)).join('')}

        <button type="button" class="wke-add wke-add-section" data-act="add" data-path="sections" data-type="section">
          + Add section (e.g. another error type)
        </button>
      </div>`;
  }

  function sectionHtml(sec, si) {
    const p = `sections.${si}`;
    return `
      <section class="wke-card wke-section">
        <div class="wke-card-head">
          <h3>Section ${si + 1}${sec.title ? ': ' + esc(sec.title) : ''}</h3>
          ${tools(p, si, state.sections.length, 'section')}
        </div>
        <div class="wke-grid wke-grid-sec">
          ${field('Icon', `${p}.icon`, sec.icon, 'maxlength="16" placeholder="⏱️"')}
          <label class="wke-field">
            <span>Icon colour</span>
            <select data-path="${p}.tone">
              ${Object.keys(TONE_NAMES).map(t => `<option value="${t}" ${t === sec.tone ? 'selected' : ''}>${TONE_NAMES[t]}</option>`).join('')}
            </select>
          </label>
          ${field('Section title', `${p}.title`, sec.title, 'placeholder="e.g. Connection Timed Out / No Route to Host"')}
        </div>
        ${field('One-line summary', `${p}.subtitle`, sec.subtitle, 'placeholder="e.g. Printer cannot reach the network — usually a cable or router issue"')}
        <div class="wke-grid">
          ${area('Error messages (one per line)', `${p}.errors`, (sec.errors || []).join('\n'), 'rows="3" placeholder="SocketException: Connection timed out…"', '', 'lines')}
          ${area('Common causes (one per line)', `${p}.causes`, (sec.causes || []).join('\n'), 'rows="3" placeholder="Loose or faulty **LAN cable**"', '', 'lines')}
        </div>
        ${imagesHtml(`${p}.images`, sec.images, 'Error screenshots')}

        ${(sec.phases || []).map((ph, pi) => phaseHtml(ph, si, pi, sec.phases.length)).join('')}

        <button type="button" class="wke-add" data-act="add" data-path="${p}.phases" data-type="phase">+ Add phase</button>
      </section>`;
  }

  function phaseHtml(ph, si, pi, count) {
    const p = `sections.${si}.phases.${pi}`;
    // Step numbers continue across phases unless a phase restarts them.
    let n = 0;
    const phases = state.sections[si].phases;
    for (let i = 0; i < pi; i++) {
      if (phases[i].restart) n = 0;
      n += phases[i].steps.length;
    }
    if (ph.restart) n = 0;

    return `
      <div class="wke-phase">
        <div class="wke-card-head">
          <h4>Phase ${pi + 1}</h4>
          ${tools(p, pi, count, 'phase')}
        </div>
        <div class="wke-grid wke-grid-phase">
          ${field('Badge', `${p}.label`, ph.label, 'maxlength="30" placeholder="Phase 1"')}
          ${field('Phase title', `${p}.title`, ph.title, 'placeholder="e.g. Hardware Check"')}
          <label class="wke-check">
            <input type="checkbox" data-path="${p}.restart" data-kind="bool" ${ph.restart ? 'checked' : ''}>
            Restart step numbers at 1
          </label>
        </div>
        ${(ph.steps || []).map((st, ti) => stepHtml(st, `${p}.steps.${ti}`, n + ti + 1, ti, ph.steps.length)).join('')}
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
          ${area('Instructions', `${p}.text`, st.text, 'rows="3" placeholder="Power off both devices, wait **10 seconds**, then power them back on."')}
          ${area('Info box (optional, blue)', `${p}.note`, st.note, 'rows="1" placeholder="e.g. IP rules: change only the last number…"')}
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

    if (act === 'add') {
      const list = getPath(path);
      const type = btn.getAttribute('data-type');
      const item = BLANKS[type]();
      if (type === 'phase') item.label = 'Phase ' + (list.length + 1);
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
  async function shrink(file) {
    if (file.type === 'image/gif') return file;
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error('Could not read ' + file.name));
        i.src = url;
      });
      const max = 1600;
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

  async function uploadAll(path, files) {
    for (const file of files) {
      uploading++;
      render();
      try {
        const blob = await shrink(file);
        const res = await fetch('/admin/api/images', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': blob.type },
          body: blob
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Upload failed (' + res.status + ')');
        if (!root) return; // editor closed meanwhile
        getPath(path).push(data.url);
        dirty = true;
      } catch (err) {
        showMsg(err.message, true);
      } finally {
        uploading--;
        if (root) render();
      }
    }
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
