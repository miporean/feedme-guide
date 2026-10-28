// FeedMe Wiki — renders every guide page from structured data, in the layout of
// the Printer Troubleshooting Guide (intro → sections → phases → numbered steps).
//
// All text is escaped. Text fields support a small, safe formatting syntax:
//   **bold**  *italic*  `code`  [link text](https://...)
//   - bullet          1. numbered        a. lettered
//   ## / ### / ####  heading
//   > blue note       ! orange warning   !! red alert      (one box per run of lines)
//   | table | row |   (add a |---|---| line under the first row to make it a header)
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

  const BOXES = { '>': 'callout callout-info', '!': 'callout callout-warning', '!!': 'callout wk-callout-danger' };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function inline(s) {
    const codes = [];
    return esc(s)
      .replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; })
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?![*\w])/g, '$1<em>$2</em>')
      .replace(/\u0000(\d+)\u0000/g, (m, i) => '<code>' + codes[i] + '</code>');
  }

  function boxType(line) {
    const m = line.match(/^(>|!!|!)(?:\s|$)/);
    return m ? m[1] : null;
  }

  function tableHtml(rows) {
    const cells = r => r.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map(c => c.trim());
    const isSep = r => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(r);
    let head = null;
    let body = rows;
    if (rows.length > 1 && isSep(rows[1])) { head = rows[0]; body = rows.slice(2); }
    return '<div class="wk-table-wrap"><table class="wk-table">' +
      (head ? '<thead><tr>' + cells(head).map(c => '<th>' + inline(c) + '</th>').join('') + '</tr></thead>' : '') +
      '<tbody>' + body.filter(r => !isSep(r)).map(r => '<tr>' + cells(r).map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') + '</tbody>' +
      '</table></div>';
  }

  // Block-level formatting: paragraphs, lists, headings, boxes and tables.
  function fmt(text) {
    const lines = String(text || '').replace(/\r\n/g, '\n').split('\n');
    const out = [];
    let para = [];
    let list = null; // { tag, type, items }
    const flushPara = () => { if (para.length) { out.push('<p>' + para.map(inline).join('<br>') + '</p>'); para = []; } };
    const flushList = () => {
      if (list) {
        out.push(`<${list.tag}${list.type ? ` type="${list.type}"` : ''}>` + list.items.map(i => '<li>' + inline(i) + '</li>').join('') + `</${list.tag}>`);
        list = null;
      }
    };
    const flush = () => { flushPara(); flushList(); };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const box = boxType(line);
      if (box) {
        flush();
        const inner = [];
        while (i < lines.length && boxType(lines[i].trim()) === box) {
          inner.push(lines[i].trim().slice(box.length).replace(/^\s/, ''));
          i++;
        }
        i--;
        out.push(`<div class="${BOXES[box]}">${fmt(inner.join('\n'))}</div>`);
        continue;
      }
      if (line.startsWith('|')) {
        flush();
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i].trim()); i++; }
        i--;
        out.push(tableHtml(rows));
        continue;
      }
      const heading = line.match(/^(#{2,4})\s+(.*)$/);
      if (heading) {
        flush();
        const level = heading[1].length;
        out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
        continue;
      }
      const bullet = line.match(/^[-•]\s+(.*)$/);
      const num = line.match(/^\d+[.)]\s+(.*)$/);
      const alpha = line.match(/^[a-z][.)]\s+(.*)$/);
      if (bullet || num || alpha) {
        flushPara();
        const tag = bullet ? 'ul' : 'ol';
        const type = alpha ? 'a' : '';
        if (list && (list.tag !== tag || list.type !== type)) flushList();
        if (!list) list = { tag, type, items: [] };
        list.items.push((bullet || num || alpha)[1]);
        continue;
      }
      if (!line) { flush(); continue; }
      flushList();
      para.push(line);
    }
    flush();
    return out.join('');
  }

  function images(list, big) {
    if (!list || !list.length) return '';
    const cls = 'wk-imgs' + (list.length === 1 ? ' wk-imgs-1' : '') + (big ? ' wk-imgs-big' : '');
    return `<div class="${cls}">` + list.map(src =>
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

  function isAccordion(sec) {
    return !!sec.title && sec.style === 'accordion';
  }

  // counter = { n } shared across the page so plain sections keep counting.
  function sectionBody(sec, counter) {
    let html = fmt(sec.text);
    const hasErrors = sec.errors && sec.errors.length;
    const hasCauses = sec.causes && sec.causes.length;
    if (hasErrors || hasCauses) {
      html += '<div class="error-detail-grid">';
      if (hasErrors) {
        html += `<div class="error-detail-card"><h4>Error Message${sec.errors.length > 1 ? 's' : ''}</h4>${sec.errors.map(e => `<code>${esc(e)}</code>`).join('')}</div>`;
      }
      if (hasCauses) {
        html += `<div class="error-detail-card"><h4>${esc(sec.causesTitle || 'Common Causes')}</h4>` +
          (sec.causes.length === 1 ? `<p>${inline(sec.causes[0])}</p>` : `<ul>${sec.causes.map(c => `<li>${inline(c)}</li>`).join('')}</ul>`) +
          '</div>';
      }
      html += '</div>';
    }
    html += images(sec.images, true);

    (sec.phases || []).forEach(ph => {
      if (ph.restart) counter.n = 0;
      if (ph.label || ph.title) {
        html += `<div class="phase-header">${ph.label ? `<span class="phase-badge">${esc(ph.label)}</span>` : ''}<span>${inline(ph.title)}</span></div>`;
      }
      // Lettered phases (A, B, C) are options, not part of the numbered sequence.
      (ph.steps || []).forEach((st, i) => { html += step(st, ph.letters ? String.fromCharCode(65 + (i % 26)) : ++counter.n); });
    });
    return html;
  }

  function render(page) {
    let html = '';
    if (page.intro) html += `<div class="callout callout-warning">${fmt(page.intro)}</div>`;

    const counter = { n: 0 };
    let firstAccordion = true;
    (page.sections || []).forEach(sec => {
      if (!isAccordion(sec)) {
        html += (sec.title ? `<h2>${inline(sec.title)}</h2>` : '') + sectionBody(sec, counter);
        return;
      }
      counter.n = 0; // each collapsible section numbers its own steps
      const [bg, fg] = TONES[sec.tone] || TONES.red;
      html += `
        <details class="error-accordion"${firstAccordion ? ' open' : ''}>
          <summary class="error-accordion-header">
            ${sec.icon ? `<div class="error-accordion-icon" style="background: ${bg}; color: ${fg};">${icon(sec.icon)}</div>` : ''}
            <div class="error-accordion-info">
              <h2>${inline(sec.title)}</h2>
              ${sec.subtitle ? `<p>${inline(sec.subtitle)}</p>` : ''}
            </div>
            <span class="error-accordion-chevron">▾</span>
          </summary>
          <div class="error-accordion-body">${sectionBody(sec, counter)}</div>
        </details>`;
      firstAccordion = false;
    });
    return html || '<p style="color: var(--text-muted);">This page has no content yet.</p>';
  }

  // An icon is an emoji, or an image uploaded in the editor (/api/img/…).
  const ICON_IMG = /^(\/api\/img\/[a-z0-9]{6,32}|\/?(images|img)\/[\w\-./]+\.(png|jpe?g|gif|webp|svg))$/i;
  function icon(value) {
    if (!value) return '';
    return ICON_IMG.test(value) ? `<img class="wk-icon-img" src="${esc(value)}" alt="">` : esc(value);
  }

  window.WikiRender = { render, esc, fmt, icon, TONES };
})();
