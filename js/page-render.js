// FeedMe Wiki — renders pages built in the editor, using the same layout as the
// Printer Troubleshooting Guide (callout → collapsible sections → phases → steps).
// All text is escaped; only a tiny formatting syntax is supported:
//   **bold**   `code`   lines starting with "- " (bullets) or "1. " (numbered)
(function () {
  'use strict';

  const TONES = {
    red: ['#FEE2E2', '#DC2626'],
    amber: ['#FEF3C7', '#D97706'],
    blue: ['#DBEAFE', '#2563EB'],
    green: ['#DCFCE7', '#16A34A'],
    purple: ['#EDE9FE', '#7C3AED'],
    gray: ['#F3F4F6', '#4B5563']
  };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  // Paragraphs, line breaks and simple lists.
  function fmt(text) {
    const out = [];
    let para = [];
    let listType = null;
    let items = [];
    const flushPara = () => { if (para.length) { out.push('<p>' + para.map(inline).join('<br>') + '</p>'); para = []; } };
    const flushList = () => { if (listType) { out.push(`<${listType}>` + items.map(i => '<li>' + inline(i) + '</li>').join('') + `</${listType}>`); listType = null; items = []; } };

    String(text || '').split('\n').forEach(raw => {
      const line = raw.trim();
      const bullet = line.match(/^[-*•]\s+(.*)$/);
      const num = line.match(/^\d+[.)]\s+(.*)$/);
      if (bullet || num) {
        flushPara();
        const type = bullet ? 'ul' : 'ol';
        if (listType !== type) flushList();
        listType = type;
        items.push((bullet || num)[1]);
      } else if (!line) {
        flushPara(); flushList();
      } else {
        flushList();
        para.push(line);
      }
    });
    flushPara(); flushList();
    return out.join('');
  }

  function images(list, big) {
    if (!list || !list.length) return '';
    const cls = list.length === 1 ? 'wk-imgs wk-imgs-1' : 'wk-imgs';
    return `<div class="${cls}${big ? ' wk-imgs-big' : ''}">` + list.map(src =>
      `<a href="${esc(src)}" target="_blank" rel="noopener"><img src="${esc(src)}" alt="" loading="lazy"></a>`
    ).join('') + '</div>';
  }

  function step(st, n) {
    return `
      <div class="step">
        <div class="step-num">${n}</div>
        <div class="step-content">
          ${st.title ? `<h4>${inline(st.title)}</h4>` : ''}
          ${fmt(st.text)}
          ${st.note ? `<div class="callout callout-info" style="margin-top: 12px;">${fmt(st.note)}</div>` : ''}
          ${images(st.images)}
        </div>
      </div>`;
  }

  function sectionBody(sec) {
    let html = '';
    if ((sec.errors && sec.errors.length) || (sec.causes && sec.causes.length)) {
      html += '<div class="error-detail-grid">';
      if (sec.errors && sec.errors.length) {
        html += `<div class="error-detail-card"><h4>Error Message${sec.errors.length > 1 ? 's' : ''}</h4>${sec.errors.map(e => `<code>${esc(e)}</code>`).join('')}</div>`;
      }
      if (sec.causes && sec.causes.length) {
        html += `<div class="error-detail-card"><h4>Common Causes</h4><ul>${sec.causes.map(c => `<li>${inline(c)}</li>`).join('')}</ul></div>`;
      }
      html += '</div>';
    }
    html += images(sec.images, true);

    let n = 0;
    (sec.phases || []).forEach(ph => {
      if (ph.restart) n = 0;
      if (ph.label || ph.title) {
        html += `<div class="phase-header">${ph.label ? `<span class="phase-badge">${esc(ph.label)}</span>` : ''}<span>${inline(ph.title)}</span></div>`;
      }
      (ph.steps || []).forEach(st => { html += step(st, ++n); });
    });
    return html;
  }

  function render(page) {
    let html = '';
    if (page.intro) html += `<div class="callout callout-warning">${fmt(page.intro)}</div>`;

    let firstAccordion = true;
    (page.sections || []).forEach(sec => {
      if (!sec.title) {
        // No title → show the steps directly, without a collapsible header.
        html += `<div class="wk-plain-section">${sectionBody(sec)}</div>`;
        return;
      }
      const [bg, fg] = TONES[sec.tone] || TONES.red;
      html += `
        <details class="error-accordion"${firstAccordion ? ' open' : ''}>
          <summary class="error-accordion-header">
            <div class="error-accordion-icon" style="background: ${bg}; color: ${fg};">${esc(sec.icon || '⚠️')}</div>
            <div class="error-accordion-info">
              <h2>${inline(sec.title)}</h2>
              ${sec.subtitle ? `<p>${inline(sec.subtitle)}</p>` : ''}
            </div>
            <span class="error-accordion-chevron">▾</span>
          </summary>
          <div class="error-accordion-body">${sectionBody(sec)}</div>
        </details>`;
      firstAccordion = false;
    });
    return html || '<p style="color: var(--text-muted);">This page has no content yet.</p>';
  }

  window.WikiRender = { render, esc, TONES };
})();
