// MIPOS X FeedMe Guideline — Main Application Logic
(function () {
  'use strict';

  const app = document.getElementById('app');
  const nav = document.getElementById('nav');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');

  // ===== ROUTING =====
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
      'integration-setup': 'tag-integration',
      'troubleshooting': 'tag-troubleshooting'
    };
    return map[catId] || 'tag-menu';
  }

  // Portal subcategory IDs
  const PORTAL_CATS = ['menu-setup', 'connect-setup', 'restaurant-operation', 'hrm'];

  const INTEGRATION_CATS = ['integration-setup'];

  function isPortalCategory(catId) {
    return PORTAL_CATS.includes(catId);
  }

  function isIntegrationCategory(catId) {
    return INTEGRATION_CATS.includes(catId);
  }

  function getCatLabel(catId) {
    const map = {
      'menu-setup': 'Menu',
      'connect-setup': 'Connect',
      'restaurant-operation': 'Operations',
      'hrm': 'HRM',
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
        count: 0
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
    ];

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
      </section>

      <section class="category-articles">
        <div class="ts-grid">
          ${cat.articles.map((article, i) => {
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
              <h3 class="ts-card-title">${article.title}</h3>
              <p class="ts-card-desc">${article.description}</p>
              ${tags.length ? `
                <div class="ts-card-tags">
                  ${tags.map(tag => `<span class="ts-tag" style="background: ${color}12; color: ${color}; border: 1px solid ${color}25;">${tag}</span>`).join('')}
                </div>
              ` : ''}
            </a>`;
    }).join('')}
        </div>
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
      </section>

      <section class="category-articles">
        <div class="empty-state" style="text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 16px;">🚧</div>
          <h3 style="color: var(--text); margin-bottom: 8px;">Coming Soon</h3>
          <p style="color: var(--text-muted);">POS guides are being prepared. Check back soon!</p>
        </div>
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
      </section>

      <section class="category-articles">
        <div class="ts-grid">
          ${cat.articles.map((article, i) => {
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
              <h3 class="ts-card-title">${article.title}</h3>
              <p class="ts-card-desc">${article.description}</p>
              ${tags.length ? `
                <div class="ts-card-tags">
                  ${tags.map(tag => `<span class="ts-tag" style="background: ${color}12; color: ${color}; border: 1px solid ${color}25;">${tag}</span>`).join('')}
                </div>
              ` : ''}
            </a>`;
    }).join('')}
        </div>
      </section>
    `;

    setupClickHandlers();
    window.scrollTo(0, 0);
  }

  // ===== RENDER CATEGORY PAGE =====
  function renderCategory(catId) {
    // Handle virtual categories
    if (catId === 'portal') { return renderPortal(); }
    if (catId === 'pos') { return renderPOS(); }
    if (catId === 'integration') { return renderIntegration(); }

    const cat = findCategory(catId);
    if (!cat) { renderHome(); return; }

    updateNav(isPortalCategory(catId) ? 'portal' : isIntegrationCategory(catId) ? 'integration' : catId);

    // Build breadcrumb with parent if applicable
    const breadcrumbParts = [`<a href="index.html" data-page="home">Home</a><span>›</span>`];
    if (isPortalCategory(catId)) {
      breadcrumbParts.push(`<a href="index.html?category=portal" data-category="portal">Portal</a><span>›</span>`);
    } else if (isIntegrationCategory(catId)) {
      breadcrumbParts.push(`<a href="index.html?category=integration" data-category="integration">Integration</a><span>›</span>`);
    }
    breadcrumbParts.push(cat.name);

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
      </section>

      <section class="category-articles">
        <div class="ts-grid">
          ${cat.articles.map((article, i) => {
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
              <h3 class="ts-card-title">${article.title}</h3>
              <p class="ts-card-desc">${article.description}</p>
              ${tags.length ? `
                <div class="ts-card-tags">
                  ${tags.map(tag => `<span class="ts-tag" style="background: ${color}12; color: ${color}; border: 1px solid ${color}25;">${tag}</span>`).join('')}
                </div>
              ` : ''}
            </a>`;
    }).join('')}
        </div>
      </section>
    `;

    setupClickHandlers();
    window.scrollTo(0, 0);
  }

  // ===== RENDER ARTICLE PAGE =====
  function renderArticle(articleId) {
    const result = findArticle(articleId);
    if (!result) { renderHome(); return; }

    const { article, category } = result;
    updateNav(isPortalCategory(category.id) ? 'portal' : isIntegrationCategory(category.id) ? 'integration' : category.id);

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
          ${isPortalCategory(category.id) ? `<a href="index.html?category=portal" data-category="portal">Portal</a><span>›</span>` : isIntegrationCategory(category.id) ? `<a href="index.html?category=integration" data-category="integration">Integration</a><span>›</span>` : ''}
          <a href="index.html?category=${category.id}" data-category="${category.id}">${category.name}</a>
          <span>›</span>
          ${article.title}
        </div>

        <h1>${article.title}</h1>
        <p class="article-desc">${article.description}</p>

        <div class="meta-tags">
          ${metaTags.join('')}
        </div>

        ${viewToggle}

        ${embedSection}

        <div class="article-content" id="stepsView" style="${article.scribeEmbed ? 'display:none' : ''}">
          ${article.content}
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
    const navId = isPortalCategory(activeId) ? 'portal' : activeId;
    nav.querySelectorAll('a').forEach(a => {
      a.classList.remove('active');
      if (navId === 'home' && a.getAttribute('data-page') === 'home') {
        a.classList.add('active');
      } else if (a.getAttribute('data-cat') === navId) {
        a.classList.add('active');
      }
    });
  }

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

  // Initial render
  render();

})();
