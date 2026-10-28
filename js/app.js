// FeedMe Wiki (created by MIPOS) — Main Application Logic
(function () {
  'use strict';

  const app = document.getElementById('app');
  const nav = document.getElementById('nav');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  // ===== ROUTING =====
  // The wiki lives at "/". If it was opened at any other address, fix the URL.
  if (location.pathname !== '/' && location.pathname !== '/index.html') {
    history.replaceState({}, '', '/' + location.search);
  }

  function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      category: params.get('category'),
      article: params.get('article'),
      search: params.get('search')
    };
  }

  function navigate(params) {
    const url = new URL(window.location.href);
    url.pathname = '/';
    url.search = '';
    Object.entries(params).forEach(([key, val]) => {
      if (val) url.searchParams.set(key, val);
    });
    window.history.pushState({}, '', url.toString());
    render();
  }

  // ===== HELPERS =====
  function findCategory(id) {
    return SITE_DATA.categories.find(c => c.id === id);
  }

  function findArticle(articleId) {
    for (const cat of SITE_DATA.categories) {
      const article = cat.articles.find(a => a.id === articleId);
      if (article) return { article, category: cat };
    }
    return null;
  }

  function getTagClass(catId) {
    const map = {
      'menu-setup': 'tag-menu',
      'connect-setup': 'tag-connect',
      'restaurant-operation': 'tag-operations',
      'hrm': 'tag-hrm',
      'pos-setup': 'tag-connect',
      'integration-setup': 'tag-integration',
      'troubleshooting': 'tag-troubleshooting'
    };
    return map[catId] || 'tag-menu';
  }

  // Portal subcategory IDs
  const PORTAL_CATS = ['menu-setup', 'connect-setup', 'restaurant-operation', 'hrm'];

  const INTEGRATION_CATS = ['integration-setup'];
  const POS_CATS = ['pos-setup'];

  function isPortalCategory(catId) {
    return PORTAL_CATS.includes(catId);
  }

  function isIntegrationCategory(catId) {
    return INTEGRATION_CATS.includes(catId);
  }

  function isPosCategory(catId) {
    return POS_CATS.includes(catId);
  }

  // Categories inside each top-level section (home cards and top menu).
  function sectionCats(sectionId) {
    if (sectionId === 'pos' || sectionId === 'troubleshooting') {
      const cat = findCategory(sectionId === 'pos' ? 'pos-setup' : 'troubleshooting');
      return cat ? [cat] : [];
    }
    return SITE_DATA.categories.filter(c => c.section === sectionId);
  }

  // Top-nav section a category belongs to.
  function navSection(catId) {
    return isPortalCategory(catId) ? 'portal' : isIntegrationCategory(catId) ? 'integration' : isPosCategory(catId) ? 'pos' : catId;
  }

  // Breadcrumb link to the parent section (Portal / Integration / POS), if any.
  function parentCrumb(catId) {
    if (isPortalCategory(catId)) return `<a href="index.html?category=portal" data-category="portal">Portal</a><span>›</span>`;
    if (isIntegrationCategory(catId)) return `<a href="index.html?category=integration" data-category="integration">Integration</a><span>›</span>`;
    if (isPosCategory(catId)) return `<a href="index.html?category=pos" data-category="pos">POS</a><span>›</span>`;
    return '';
  }

  function getCatLabel(catId) {
    const map = {
      'menu-setup': 'Menu',
      'connect-setup': 'Connect',
      'restaurant-operation': 'Operations',
      'hrm': 'HRM',
      'pos-setup': 'POS',
      'integration-setup': 'Integration',
      'troubleshooting': 'Troubleshooting'
    };
    return map[catId] || catId;
  }

  function searchArticles(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    const results = [];
    SITE_DATA.categories.forEach(cat => {
      cat.articles.forEach(article => {
        const titleMatch = article.title.toLowerCase().includes(q);
        const descMatch = article.description.toLowerCase().includes(q);
        const tagMatch = article.tags.some(t => t.toLowerCase().includes(q));
        if (titleMatch || descMatch || tagMatch) {
          results.push({ article, category: cat, score: titleMatch ? 3 : descMatch ? 2 : 1 });
        }
      });
    });
    return results.sort((a, b) => b.score - a.score);
  }

  // ===== SVG ICONS =====
  const icons = {
    doc: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    arrow: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>',
    back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>',
    search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
  };

  // Staff-only "Delete category" button for a category page.
  function categoryActions(cat) {
    if (!admin || !cat) return '';
    return `
        <div class="wk-admin-actions">
          <button type="button" class="wk-btn wk-btn-danger" data-delete-category="${cat.id}">🗑 Delete category</button>
        </div>`;
  }

  // ===== ARTICLE CARD GRID =====
  function articleGrid(cat) {
    const cards = cat.articles.map((article, i) => {
      const color = article.articleColor || cat.color;
      const icon = article.articleIcon || cat.icon;
      const tags = (article.tags || []).slice(0, 3);
      return `
            <a class="ts-card animate-in" data-article="${article.id}" style="animation-delay: ${i * 0.08}s; --card-accent: ${color};">
              <div class="ts-card-header">
                <div class="ts-card-icon" style="background: ${color}15; color: ${color};">
                  ${icon}
                </div>
                <span class="ts-card-arrow">${icons.arrow}</span>
              </div>
              <h3 class="ts-card-title">${article.title}${article.draft ? ' <span class="wk-draft-badge">Hidden</span>' : ''}</h3>
              <p class="ts-card-desc">${article.description}</p>
              ${tags.length ? `
                <div class="ts-card-tags">
                  ${tags.map(tag => `<span class="ts-tag" style="background: ${color}12; color: ${color}; border: 1px solid ${color}25;">${tag}</span>`).join('')}
                </div>
              ` : ''}
            </a>`;
    });
    if (admin) {
      cards.push(`
            <button type="button" class="ts-card wk-add-card" data-new-page="${cat.id}">
              <span class="wk-add-plus">+</span>
              <span>Add new page to ${cat.name}</span>
              <small>Only MIPOS staff can see this</small>
            </button>`);
    }
    if (!cards.length) return '';
    return `<div class="ts-grid">${cards.join('')}</div>`;
  }

  // ===== RENDER HOME PAGE =====
  function renderHome() {
    updateNav('home');

    // Build top-level sections for home
    const portalCats = SITE_DATA.categories.filter(c => c.section === 'portal');
    const integrationCats = SITE_DATA.categories.filter(c => c.section === 'integration');
    const troubleshootingCat = findCategory('troubleshooting');
    const portalArticleCount = portalCats.reduce((sum, c) => sum + c.articles.length, 0);
    const integrationArticleCount = integrationCats.reduce((sum, c) => sum + c.articles.length, 0);
    const tsArticleCount = troubleshootingCat ? troubleshootingCat.articles.length : 0;
    const posCat = findCategory('pos-setup');
    const posArticleCount = posCat ? posCat.articles.length : 0;

    const topSections = [
      {
        id: 'portal',
        name: 'FeedMe Portal',
        icon: '🖥️',
        color: '#FF6B35',
        bgColor: '#FFF0EB',
        description: 'Menu setup, promotions, operations, and HR management guides.',
        count: portalArticleCount
      },
      {
        id: 'pos',
        name: 'FeedMe POS',
        icon: '📱',
        color: '#4A6CF7',
        bgColor: '#EEF2FF',
        description: 'POS system setup and usage tutorials.',
        count: posArticleCount
      },
      {
        id: 'integration',
        name: 'Integration Setup',
        icon: '🔌',
        color: '#10B981',
        bgColor: '#ECFDF5',
        description: 'E-invoicing and accounting software integration setup guides.',
        count: integrationArticleCount
      },
      {
        id: 'troubleshooting',
        name: 'Troubleshooting',
        icon: '🔧',
        color: '#F59E0B',
        bgColor: '#FFF8E1',
        description: 'Common issues and solutions for printers, connectivity, and more.',
        count: tsArticleCount
      }
    ].filter(sec => sectionCats(sec.id).length); // hide sections whose categories were all deleted

    // Popular articles from all categories
    const popularArticles = [];
    SITE_DATA.categories.forEach(cat => {
      cat.articles.slice(0, 2).forEach(article => {
        popularArticles.push({ article, category: cat });
      });
    });

    app.innerHTML = `
      <!-- Hero -->
      <section class="hero">
        <h1>How can we help you?</h1>
        <p>${SITE_DATA.siteTagline}</p>
        <div class="search-container">
          <div class="search-box">
            <span class="search-icon">${icons.search}</span>
            <input type="text" id="searchInput" placeholder="Search for guides... e.g. 'create product', 'promotion'" autocomplete="off">
            <div class="search-results" id="searchResults"></div>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="categories-section">
        <div class="categories-grid">
          ${topSections.map((sec, i) => `
            <a class="category-card animate-in" data-category="${sec.id}" style="animation-delay: ${i * 0.1}s">
              <div class="card-icon" style="background: ${sec.bgColor}; color: ${sec.color};">${sec.icon}</div>
              <h3>${sec.name}</h3>
              <p>${sec.description}</p>
              <div class="article-count">
                ${icons.doc}
                <span>${sec.count}</span> ${sec.count === 1 ? 'article' : 'articles'}
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- Popular Articles -->
      <section class="popular-section">
        <h2 class="section-title">📌 Popular Guides</h2>
        <div class="article-list">
          ${popularArticles.map(({ article, category }) => `
            <a class="article-item" data-article="${article.id}">
              <span class="article-item-icon">${icons.doc}</span>
              <span class="article-item-title">${article.title}</span>
              <span class="article-tag ${getTagClass(category.id)}">${getCatLabel(category.id)}</span>
            </a>
          `).join('')}
        </div>
      </section>
    `;

    setupSearch();
    setupClickHandlers();
  }

  // ===== RENDER TROUBLESHOOTING CATEGORY =====
  function renderTroubleshootingCategory() {
    const cat = findCategory('troubleshooting');
    if (!cat) { renderHome(); return; }

    updateNav('troubleshooting');

    app.innerHTML = `
      <section class="category-hero">
        <div class="breadcrumb">
          <a href="index.html" data-page="home">Home</a>
          <span>›</span>
          ${cat.name}
        </div>
        <div class="category-hero-content">
          <div class="category-hero-icon" style="background: ${cat.bgColor}; color: ${cat.color}; font-size: 32px;">
            ${cat.icon}
          </div>
          <div>
            <h1>${cat.name}</h1>
            <p class="subtitle">${cat.description}</p>
          </div>
        </div>
        ${categoryActions(cat)}
      </section>

      <section class="category-articles">
        ${articleGrid(cat)}
      </section>
    `;

    setupClickHandlers();
    window.scrollTo(0, 0);
  }

  // ===== RENDER PORTAL LANDING PAGE =====
  function renderPortal() {
    updateNav('portal');
    const portalCats = SITE_DATA.categories.filter(c => c.section === 'portal');

    app.innerHTML = `
      <section class="category-hero">
        <div class="breadcrumb">
          <a href="index.html" data-page="home">Home</a>
          <span>›</span>
          Portal
        </div>
        <div class="category-hero-content">
          <div class="category-hero-icon" style="background: #FFF0EB; color: #FF6B35; font-size: 32px;">
            🖥️
          </div>
          <div>
            <h1>FeedMe Portal</h1>
            <p class="subtitle">Setup guides for menu, promotions, operations, and HR management in FeedMe Portal.</p>
          </div>
        </div>
      </section>

      <section class="category-articles">
        <div class="ts-grid">
          ${portalCats.map((cat, i) => `
            <a class="ts-card animate-in" data-category="${cat.id}" style="animation-delay: ${i * 0.08}s; --card-accent: ${cat.color};">
              <div class="ts-card-header">
                <div class="ts-card-icon" style="background: ${cat.bgColor}; color: ${cat.color};">
                  ${cat.icon}
                </div>
                <span class="ts-card-arrow">${icons.arrow}</span>
              </div>
              <h3 class="ts-card-title">${cat.name}</h3>
              <p class="ts-card-desc">${cat.description}</p>
              <div class="ts-card-tags">
                <span class="ts-tag" style="background: ${cat.color}12; color: ${cat.color}; border: 1px solid ${cat.color}25;">${cat.articles.length} articles</span>
              </div>
            </a>
          `).join('')}
        </div>
      </section>
    `;

    setupClickHandlers();
    window.scrollTo(0, 0);
  }

  // ===== RENDER POS LANDING PAGE =====
  function renderPOS() {
    updateNav('pos');
    const posCat = findCategory('pos-setup');

    app.innerHTML = `
      <section class="category-hero">
        <div class="breadcrumb">
          <a href="index.html" data-page="home">Home</a>
          <span>›</span>
          POS
        </div>
        <div class="category-hero-content">
          <div class="category-hero-icon" style="background: #EEF2FF; color: #4A6CF7; font-size: 32px;">
            📱
          </div>
          <div>
            <h1>FeedMe POS</h1>
            <p class="subtitle">Setup guides and tutorials for FeedMe POS system.</p>
          </div>
        </div>
        ${categoryActions(posCat)}
      </section>

      <section class="category-articles">
        ${posCat && posCat.articles.length ? '' : `<div class="empty-state" style="text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🚧</div>
          <h3 style="color: var(--text); margin-bottom: 8px;">Coming Soon</h3>
          <p style="color: var(--text-muted);">POS guides are being prepared. Check back soon!</p>
        </div>`}
        ${posCat ? articleGrid(posCat) : ''}
      </section>
    `;

    setupClickHandlers();
    window.scrollTo(0, 0);
  }

  // ===== RENDER INTEGRATION LANDING PAGE =====
  function renderIntegration() {
    const cat = findCategory('integration-setup');
    if (!cat) { renderHome(); return; }

    updateNav('integration');

    app.innerHTML = `
      <section class="category-hero">
        <div class="breadcrumb">
          <a href="index.html" data-page="home">Home</a>
          <span>›</span>
          Integration Setup
        </div>
        <div class="category-hero-content">
          <div class="category-hero-icon" style="background: ${cat.bgColor}; color: ${cat.color}; font-size: 32px;">
            ${cat.icon}
          </div>
          <div>
            <h1>${cat.name}</h1>
            <p class="subtitle">${cat.description}</p>
          </div>
        </div>
        ${categoryActions(cat)}
      </section>

      <section class="category-articles">
        ${articleGrid(cat)}
      </section>
    `;

    setupClickHandlers();
    window.scrollTo(0, 0);
  }

  // ===== RENDER CATEGORY PAGE =====
  function renderCategory(catId) {
    // Handle virtual categories
    if (['portal', 'pos', 'integration'].includes(catId) && !sectionCats(catId).length) { renderHome(); return; }
    if (catId === 'portal') { return renderPortal(); }
    if (catId === 'pos') { return renderPOS(); }
    if (catId === 'integration') { return renderIntegration(); }

    const cat = findCategory(catId);
    if (!cat) { renderHome(); return; }

    updateNav(navSection(catId));

    const breadcrumbParts = [`<a href="index.html" data-page="home">Home</a><span>›</span>`, parentCrumb(catId), cat.name];

    app.innerHTML = `
      <section class="category-hero">
        <div class="breadcrumb">
          ${breadcrumbParts.join('')}
        </div>
        <div class="category-hero-content">
          <div class="category-hero-icon" style="background: ${cat.bgColor}; color: ${cat.color}; font-size: 32px;">
            ${cat.icon}
          </div>
          <div>
            <h1>${cat.name}</h1>
            <p class="subtitle">${cat.description}</p>
          </div>
        </div>
        ${categoryActions(cat)}
      </section>

      <section class="category-articles">
        ${articleGrid(cat)}
      </section>
    `;

    setupClickHandlers();
    window.scrollTo(0, 0);
  }

  // ===== RENDER ARTICLE PAGE =====
  function renderArticle(articleId) {
    // Wait for edited / new pages so customers never see an outdated version.
    if (!customLoaded) {
      app.innerHTML = '<div class="page-loading"><div class="scribe-loading-spinner"></div></div>';
      return;
    }
    const result = findArticle(articleId);
    if (!result) { renderHome(); return; }

    const { article, category } = result;
    updateNav(navSection(category.id));

    // Build view toggle if scribeEmbed is available
    let viewToggle = '';
    let embedSection = '';
    if (article.scribeEmbed) {
      viewToggle = `
        <div class="view-toggle">
          <button class="view-toggle-btn" data-view="embed" aria-pressed="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Interactive Guide
          </button>
          <button class="view-toggle-btn" data-view="steps" aria-pressed="false">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            Quick Steps
          </button>
        </div>
      `;
      embedSection = `
        <div class="scribe-embed-wrapper" id="embedView">
          <div class="scribe-embed-loading">
            <div class="scribe-loading-spinner"></div>
            <p>Loading interactive guide...</p>
          </div>
          <iframe
            src="${article.scribeEmbed}"
            width="100%"
            height="640"
            allowfullscreen
            frameborder="0"
            loading="lazy"
            onload="this.parentElement.querySelector('.scribe-embed-loading').style.display='none'"
          ></iframe>
        </div>
      `;
    }

    const metaTags = [];
    metaTags.push(`<span class="meta-tag meta-tag-category">${category.name}</span>`);
    if (article.steps) metaTags.push(`<span class="meta-tag meta-tag-steps">${article.steps} Steps</span>`);
    if (article.duration) metaTags.push(`<span class="meta-tag meta-tag-time">${article.duration}</span>`);

    app.innerHTML = `
      <article class="article-page">
        <div class="breadcrumb">
          <a href="index.html" data-page="home">Home</a>
          <span>›</span>
          ${parentCrumb(category.id)}
          <a href="index.html?category=${category.id}" data-category="${category.id}">${category.name}</a>
          <span>›</span>
          ${article.title}
        </div>

        ${admin ? `
          <div class="wk-admin-actions">
            ${article.draft ? '<span class="wk-draft-badge">Hidden — customers cannot see this page</span>' : ''}
            ${article.edited ? `<span class="wk-edited-badge" title="${WikiRender.esc(article.page.updatedBy || '')}">Edited${article.page.updatedAt ? ' ' + new Date(article.page.updatedAt).toLocaleDateString() : ''}</span>` : ''}
            <button type="button" class="wk-btn" data-edit-page="${article.id}">✏️ Edit page</button>
            ${article.builtin && article.edited ? `<button type="button" class="wk-btn wk-btn-danger" data-restore-page="${article.id}">↺ Restore original</button>` : ''}
            <button type="button" class="wk-btn wk-btn-danger" data-delete-page="${article.id}">🗑 Delete page</button>
          </div>` : ''}

        <h1>${article.title}</h1>
        <p class="article-desc">${article.description}</p>

        <div class="meta-tags">
          ${metaTags.join('')}
        </div>

        ${viewToggle}

        ${embedSection}

        <div class="article-content" id="stepsView" style="${article.scribeEmbed ? 'display:none' : ''}">
          ${WikiRender.render(article.page)}
        </div>

        <a class="back-link" data-category="${category.id}">
          ${icons.back} Back to ${category.name}
        </a>
      </article>
    `;

    // Set up view toggle handlers
    if (article.scribeEmbed) {
      const toggleBtns = document.querySelectorAll('.view-toggle-btn');
      const embedView = document.getElementById('embedView');
      const stepsView = document.getElementById('stepsView');

      toggleBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          const view = this.getAttribute('data-view');
          toggleBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
          this.setAttribute('aria-pressed', 'true');

          if (view === 'embed') {
            embedView.style.display = 'block';
            stepsView.style.display = 'none';
          } else {
            embedView.style.display = 'none';
            stepsView.style.display = 'block';
          }
        });
      });
      if (!navigator.onLine) document.querySelector('.view-toggle-btn[data-view="steps"]').click();
    }

    setupClickHandlers();
    window.scrollTo(0, 0);
  }

  // ===== SEARCH =====
  function setupSearch() {
    const input = document.getElementById('searchInput');
    const resultsEl = document.getElementById('searchResults');
    if (!input || !resultsEl) return;

    let debounceTimer;

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = input.value.trim();
        if (query.length < 2) {
          resultsEl.classList.remove('active');
          return;
        }

        const results = searchArticles(query);
        if (results.length === 0) {
          resultsEl.innerHTML = '<div class="search-no-results">No guides found for "' + query + '"</div>';
        } else {
          resultsEl.innerHTML = results.slice(0, 8).map(({ article, category }) => `
            <div class="search-result-item" data-article="${article.id}">
              <span class="search-result-icon">${category.icon}</span>
              <div class="search-result-info">
                <h4>${highlightMatch(article.title, query)}</h4>
                <p>${category.name}</p>
              </div>
            </div>
          `).join('');
        }
        resultsEl.classList.add('active');

        // Click handler for search results
        resultsEl.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const articleId = item.getAttribute('data-article');
            navigate({ article: articleId });
          });
        });
      }, 50);
    });

    // Close results on click outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-container')) {
        resultsEl.classList.remove('active');
      }
    });

    // Keyboard navigation
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        resultsEl.classList.remove('active');
        input.blur();
      }
    });
  }

  function highlightMatch(text, query) {
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<strong style="color: var(--primary);">$1</strong>');
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ===== CLICK HANDLERS =====
  function setupClickHandlers() {
    // Category clicks
    document.querySelectorAll('[data-category]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        const catId = this.getAttribute('data-category');
        navigate({ category: catId });
      });
    });

    // Article clicks
    document.querySelectorAll('[data-article]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        const articleId = this.getAttribute('data-article');
        navigate({ article: articleId });
      });
    });

    // MIPOS-only buttons
    document.querySelectorAll('[data-new-page]').forEach(el => {
      el.addEventListener('click', () => openEditor(null, el.getAttribute('data-new-page')));
    });
    document.querySelectorAll('[data-edit-page]').forEach(el => {
      el.addEventListener('click', () => {
        const found = findArticle(el.getAttribute('data-edit-page'));
        if (found) openEditor(Object.assign({}, found.article.page, { category: found.category.id }));
      });
    });
    document.querySelectorAll('[data-delete-page]').forEach(el => {
      el.addEventListener('click', () => deletePage(el.getAttribute('data-delete-page'), false));
    });
    document.querySelectorAll('[data-restore-page]').forEach(el => {
      el.addEventListener('click', () => deletePage(el.getAttribute('data-restore-page'), true));
    });
    document.querySelectorAll('[data-delete-category]').forEach(el => {
      el.addEventListener('click', () => deleteCategory(el.getAttribute('data-delete-category')));
    });

    // Home page clicks
    document.querySelectorAll('[data-page="home"]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        navigate({});
      });
    });
  }

  // ===== NAV STATE =====
  function updateNav(activeId) {
    // Map portal subcategories to 'portal' for nav highlighting
    const navId = navSection(activeId);
    nav.querySelectorAll('a').forEach(a => {
      const sec = a.getAttribute('data-cat');
      if (sec) a.hidden = !sectionCats(sec).length; // section deleted
      a.classList.remove('active');
      if (navId === 'home' && a.getAttribute('data-page') === 'home') {
        a.classList.add('active');
      } else if (a.getAttribute('data-cat') === navId) {
        a.classList.add('active');
      }
    });
  }

  // ===== HEADER FIT =====
  // Use the ☰ menu whenever the top menu does not fit on one line
  // (e.g. staff buttons + Download app on a small laptop).
  const header = document.getElementById('header');
  function fitHeader() {
    header.classList.remove('wk-compact');
    if (window.innerWidth > 768 && (header.scrollWidth > header.clientWidth + 1 || nav.scrollWidth > nav.clientWidth + 1)) {
      header.classList.add('wk-compact');
    }
  }
  window.wikiFitHeader = fitHeader;
  window.addEventListener('resize', fitHeader);
  if (document.fonts) document.fonts.ready.then(fitHeader);

  // ===== MOBILE MENU =====
  mobileMenuBtn.addEventListener('click', function () {
    nav.classList.toggle('open');
    this.textContent = nav.classList.contains('open') ? '✕' : '☰';
  });

  // Close mobile menu on nav click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      nav.classList.remove('open');
      mobileMenuBtn.textContent = '☰';

      const page = this.getAttribute('data-page');
      const cat = this.getAttribute('data-cat');
      if (page === 'home') {
        navigate({});
      } else if (cat) {
        navigate({ category: cat });
      }
    });
  });

  // ===== MAIN RENDER =====
  function render() {
    const params = getParams();
    if (params.article) {
      renderArticle(params.article);
    } else if (params.category) {
      renderCategory(params.category);
    } else {
      renderHome();
    }
  }

  // Handle browser back/forward
  window.addEventListener('popstate', render);

  // ===== PAGES MADE IN THE EDITOR (stored in D1) =====
  let customLoaded = false;
  let admin = null; // { email } when a MIPOS staff member is signed in

  function isStaffBrowser() {
    try { return localStorage.getItem('wikiStaff') === '1'; } catch (e) { return false; }
  }

  async function getJson(url) {
    const res = await fetch(url, { cache: 'no-store', credentials: 'same-origin', redirect: 'manual' });
    if (!res.ok) throw new Error(res.status);
    return res.json();
  }

  // Article fields are inserted as HTML by the templates above, so escape
  // page text before it joins SITE_DATA.
  function toArticle(page, opts) {
    const esc = WikiRender.esc;
    return {
      id: page.id,
      title: esc(page.title),
      description: esc(page.description || ''),
      tags: (page.tags || []).map(esc),
      articleIcon: page.icon ? WikiRender.icon(page.icon) : '',
      articleColor: /^#[0-9a-f]{6}$/i.test(page.color || '') ? page.color : '',
      scribeEmbed: /^https:\/\/scribehow\.com\/embed\//.test(page.scribeEmbed || '') ? page.scribeEmbed : '',
      steps: page.steps,
      duration: page.duration ? esc(page.duration) : '',
      builtin: !!opts.builtin,
      edited: !!opts.edited,
      draft: page.published === false,
      page
    };
  }

  // Built-in pages from data.js, kept so edits can be undone ("Restore original").
  const BUILTIN = SITE_DATA.categories.map(cat => ({
    catId: cat.id,
    pages: cat.articles.map(p => Object.assign({}, p, { category: cat.id, published: true }))
  }));
  const BUILTIN_IDS = new Set(BUILTIN.flatMap(c => c.pages.map(p => p.id)));

  const ALL_CATEGORIES = SITE_DATA.categories.slice();

  // Rebuild every category: built-in pages, replaced by their edited copy if
  // there is one, then pages created in the editor. Deleted categories (and
  // the pages in them) are left out.
  function mergePages(pages, hidden, deletedCategories) {
    const byId = new Map(pages.map(p => [p.id, p]));
    const hiddenIds = new Set(hidden || []);
    const deletedCats = new Set(deletedCategories || []);
    SITE_DATA.categories = ALL_CATEGORIES.filter(cat => !deletedCats.has(cat.id));
    ALL_CATEGORIES.forEach(cat => { cat.articles = []; });
    BUILTIN.forEach(({ pages: list }) => list.forEach(orig => {
      if (hiddenIds.has(orig.id)) return;
      const edited = byId.get(orig.id);
      const page = edited || orig;
      const cat = findCategory(page.category);
      if (cat) cat.articles.push(toArticle(page, { builtin: true, edited: !!edited }));
    }));
    pages.forEach(page => {
      if (BUILTIN_IDS.has(page.id)) return;
      const cat = findCategory(page.category);
      if (cat) cat.articles.push(toArticle(page, { builtin: false }));
    });
  }

  async function loadCustomPages() {
    let data = {};
    if (isStaffBrowser()) {
      try {
        admin = await getJson('/admin/api/me');
      } catch (e) {
        admin = null;
        console.warn('FeedMe Wiki: staff login check failed (' + e.message + '). Open /admin for details.');
      }
    }
    try {
      data = await getJson(admin ? '/admin/api/pages' : '/api/pages');
    } catch (e) { /* editor storage not set up yet — built-in pages still work */ }
    mergePages(data.pages || [], data.hidden, data.deletedCategories);
    customLoaded = true;
    renderAdminBar();
    render();

    // "+ New page" on the staff page links here with ?new=1
    if (admin && new URLSearchParams(location.search).get('new') === '1') {
      history.replaceState({}, '', location.pathname);
      openEditor(null, null);
    }
  }

  async function reloadCustomPages() {
    const data = await getJson('/admin/api/pages');
    mergePages(data.pages || [], data.hidden, data.deletedCategories);
  }

  // ===== MIPOS STAFF TOOLS =====
  // Shown only in browsers that went through /admin (Cloudflare Access login);
  // every save is checked again on the server.
  function renderAdminBar() {
    // Staff tools sit at the start of the top menu, before Home.
    // Only for a signed-in staff member; staff sign in from /admin.
    let bar = document.getElementById('wkNavStaff');
    if (!admin) { if (bar) bar.remove(); fitHeader(); return; }
    if (!bar) {
      bar = document.createElement('span');
      bar.id = 'wkNavStaff';
      bar.className = 'wk-nav-staff';
      nav.prepend(bar);
    }
    if (admin) {
      bar.innerHTML = `
        <button type="button" class="wk-btn wk-btn-primary wk-nav-new" id="wkNewPage">+ New page</button>
        <a class="wk-nav-staff-link" href="/admin/" title="Signed in as ${WikiRender.esc(admin.email)}">Staff page</a>`;
      bar.querySelector('#wkNewPage').addEventListener('click', () => {
        nav.classList.remove('open');
        mobileMenuBtn.textContent = '☰';
        const cat = getParams().category;
        openEditor(null, findCategory(cat) ? cat : (cat === 'pos' ? 'pos-setup' : null));
      });
    }
    fitHeader();
  }

  let editorLoading = null;
  function loadEditor() {
    if (window.WikiEditor) return Promise.resolve();
    if (!editorLoading) {
      editorLoading = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'js/editor.js?v=12';
        s.onload = resolve;
        s.onerror = () => { editorLoading = null; reject(new Error('Could not load the editor')); };
        document.head.appendChild(s);
      });
    }
    return editorLoading;
  }

  async function openEditor(page, categoryId) {
    if (!admin) return;
    try { await loadEditor(); } catch (e) { alert(e.message); return; }
    if (!SITE_DATA.categories.length) { alert('All categories are deleted. Restore one from the Staff page first.'); return; }
    window.WikiEditor.open({
      page: page ? Object.assign({}, page, { builtin: BUILTIN_IDS.has(page.id) }) : null,
      categoryId: findCategory(categoryId) ? categoryId : SITE_DATA.categories[0].id,
      categories: SITE_DATA.categories.map(c => ({ id: c.id, name: c.name, section: c.section, color: c.color })),
      onSaved: async saved => {
        await reloadCustomPages();
        navigate({ article: saved.id });
      }
    });
  }

  // Moves a page or category to the Staff page's "Deleted" list.
  async function moveToTrash(kind, id, title) {
    const res = await fetch('/admin/api/trash', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', kind, id, title })
    });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Delete failed');
  }

  // Deletes a page (restorable from the Staff page), or (restore = true) drops
  // the edited copy of a built-in page.
  async function deletePage(id, restore) {
    const found = findArticle(id);
    if (!found) return;
    const title = found.article.page.title;
    const question = restore
      ? `Restore "${title}" to the original version?\n\nAll changes made in the editor will be lost.`
      : `Delete "${title}"?\n\nCustomers will no longer see this page. You can bring it back from the Staff page (Deleted).`;
    if (!confirm(question)) return;
    try {
      if (restore) {
        const res = await fetch('/admin/api/pages/' + encodeURIComponent(id), { method: 'DELETE', credentials: 'same-origin' });
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Restore failed');
      } else {
        await moveToTrash('page', id, title);
      }
      await reloadCustomPages();
      if (restore) navigate({ article: id });
      else navigate({ category: found.category.id });
    } catch (e) {
      alert(e.message);
    }
  }

  async function deleteCategory(id) {
    const cat = findCategory(id);
    if (!cat) return;
    const name = cat.name.replace(/&amp;/g, '&');
    const n = cat.articles.length;
    const question = `Delete the category "${name}"` + (n ? ` and its ${n} page${n === 1 ? '' : 's'}?` : '?') +
      `\n\nCustomers will no longer see it. You can bring it back from the Staff page (Deleted).`;
    if (!confirm(question)) return;
    try {
      await moveToTrash('category', id, name);
      await reloadCustomPages();
      renderAdminBar();
      const sec = navSection(id);
      navigate(sec !== id && sectionCats(sec).length ? { category: sec } : {});
    } catch (e) {
      alert(e.message);
    }
  }

  // Initial render (built-in pages), then again once edited / new pages have loaded.
  mergePages([]);
  render();
  loadCustomPages();

})();
