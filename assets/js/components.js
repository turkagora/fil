// ===== NAVBAR & FOOTER COMPONENT INJECTOR =====

const NAV_LINKS = [
  { href: './index.html', i18nKey: 'nav_home' },
  { href: './bio.html',   i18nKey: 'nav_bio' },
];

const ICONS = {
  sun: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`,
  moon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`
};

function buildNavLinks() {
  return NAV_LINKS.map(l =>
    `<a href="${l.href}" data-i18n="${l.i18nKey}">${l.i18nKey}</a>`
  ).join('\n      ');
}

function injectHeader() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');
  nav.innerHTML = `
  <div class="navbar-inner">
    <a href="./index.html" class="navbar-logo" aria-label="Turkofil home">
      <img src="./assets/img/logo.png" alt="Turkofil logo" width="38" height="38" loading="lazy">
      <span class="navbar-logo-name">Turko<span>fil</span></span>
    </a>
    <div class="navbar-links">
      ${buildNavLinks()}
    </div>
    <div class="navbar-actions">
      <div class="lang-switcher" role="group" aria-label="Language">
        <button class="lang-btn" data-lang="TR">TR</button>
        <span class="lang-divider" aria-hidden="true"></span>
        <button class="lang-btn active" data-lang="EN">EN</button>
        <span class="lang-divider" aria-hidden="true"></span>
        <button class="lang-btn" data-lang="FR">FR</button>
      </div>
      <a href="https://www.instagram.com/turkishwithturkofil/" target="_blank" rel="noopener noreferrer" class="navbar-ig-btn" aria-label="Instagram">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </a>
      <a href="https://www.buymeacoffee.com/turkofillanguage" target="_blank" rel="noopener noreferrer" class="bmc-nav-btn" aria-label="Buy Me a Coffee">
        <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" style="height:36px !important;width:auto !important;display:block;">
      </a>
      <a href="./lessons.html" class="btn-primary" data-i18n="hero_cta">Lesson Packages</a>
	  </a>
	<a href="./placement-test.html" class="btn-outline" data-i18n="hero_cta2">Placement Test</a>
    </div>
    <button class="hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>`;

  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.setAttribute('role', 'dialog');
  mobileNav.setAttribute('aria-label', 'Mobile navigation');
  mobileNav.innerHTML = `
    ${buildNavLinks()}
    <a href="./lessons.html" data-i18n="nav_lessons" style="font-size:inherit;">Book a Lesson</a>
    <a href="https://www.instagram.com/turkishwithturkofil/" target="_blank" rel="noopener noreferrer"
       style="display:flex;align-items:center;gap:0.5rem;border:none;padding:var(--space-3) 0;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
      @turkishwithturkofil
    </a>
    <a href="https://www.buymeacoffee.com/turkofillanguage" target="_blank" rel="noopener noreferrer"
       style="border:none;padding:var(--space-3) 0;background:none;" aria-label="Buy Me a Coffee">
      <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" style="height:40px;width:auto;">
    </a>
    <div class="lang-switcher" style="margin-top:1rem;" role="group" aria-label="Language">
      <button class="lang-btn" data-lang="TR">TR</button>
      <span class="lang-divider" aria-hidden="true"></span>
      <button class="lang-btn active" data-lang="EN">EN</button>
      <span class="lang-divider" aria-hidden="true"></span>
      <button class="lang-btn" data-lang="FR">FR</button>
    </div>`;

  document.body.insertBefore(mobileNav, document.body.firstChild);
  document.body.insertBefore(nav, document.body.firstChild);

  // Hamburger toggle
  const hamburger = nav.querySelector('.hamburger');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

function initThemeToggle(btn) {
  const html = document.documentElement;

  // Başlangıç teması: sistem tercihine bak, data-theme varsa onu kullan
  let currentTheme = html.getAttribute('data-theme');
  if (!currentTheme) {
    currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    html.setAttribute('data-theme', currentTheme);
  }

  // İkonu temaya göre ayarla
  function updateIcon(theme) {
    btn.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  updateIcon(currentTheme);

  btn.addEventListener('click', () => {
    currentTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);
  });
}

function injectFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
  <div class="footer-inner">
    <a href="./index.html" class="footer-brand" aria-label="Turkofil home">
      <img src="./assets/img/logo.png" alt="Turkofil logo" width="32" height="32" loading="lazy">
      <span class="footer-brand-name">Turko<span>fil</span></span>
    </a>
    <nav class="footer-links" aria-label="Footer navigation">
      ${buildNavLinks()}
      <a href="./lessons.html" data-i18n="nav_lessons">Book a Lesson</a>
    </nav>
    <div class="footer-social">
      <a href="https://www.instagram.com/turkishwithturkofil/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      </a>
      <a href="https://buymeacoffee.com/turkofillanguage" target="_blank" rel="noopener noreferrer" aria-label="Buy Me a Coffee">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
          <line x1="6" y1="1" x2="6" y2="4"/>
          <line x1="10" y1="1" x2="10" y2="4"/>
          <line x1="14" y1="1" x2="14" y2="4"/>
        </svg>
      </a>
    </div>
    <p class="footer-copy" data-i18n="footer_copy">© 2026 Turkofil. All rights reserved.</p>
  </div>`;

  // Yüzen tema butonu
  const themeBtn = document.createElement('button');
  themeBtn.className = 'theme-float-btn';
  themeBtn.setAttribute('aria-label', 'Toggle theme');

  // BMC widget script
  const bmcScript = document.createElement('script');
  bmcScript.setAttribute('data-name', 'BMC-Widget');
  bmcScript.setAttribute('data-cfasync', 'false');
  bmcScript.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
  bmcScript.setAttribute('data-id', 'turkofillanguage');
  bmcScript.setAttribute('data-description', 'Support me on Buy me a coffee!');
  bmcScript.setAttribute('data-message', "You can support me with a coffee / Vous pouvez me soutenir en m'offrant un café :)");
  bmcScript.setAttribute('data-color', '#FF813F');
  bmcScript.setAttribute('data-position', 'Right');
  bmcScript.setAttribute('data-x_margin', '18');
  bmcScript.setAttribute('data-y_margin', '18');

  document.body.appendChild(footer);
  document.body.appendChild(themeBtn);
  document.body.appendChild(bmcScript);

  // Theme toggle'ı başlat — buton DOM'a eklendikten hemen sonra
  initThemeToggle(themeBtn);
}

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
});