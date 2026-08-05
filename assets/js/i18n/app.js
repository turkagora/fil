let currentLang = 'EN';

(function () {
  const html = document.documentElement;
  if (!html.getAttribute('data-theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();

function getMergedI18n(lang) {
  const common = (window.i18nCommon && window.i18nCommon[lang]) || {};
  const page = (window.i18nPage && window.i18nPage[lang]) || {};
  return { ...common, ...page };
}

function applyLang(lang) {
  currentLang = lang;
  const t = getMergedI18n(lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t[key];
      else el.innerHTML = t[key];
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
  document.documentElement.lang = lang === 'TR' ? 'tr' : lang === 'FR' ? 'fr' : 'en';
  updateCookieConsentLanguage(lang);
}

function updateCookieConsentLanguage(lang) {
  var ccLang = lang.toLowerCase();
  if (window.CookieConsent && typeof CookieConsent.setLanguage === 'function') {
    CookieConsent.setLanguage(ccLang, true);
  } else {
    setTimeout(function () {
      if (window.CookieConsent && typeof CookieConsent.setLanguage === 'function') {
        CookieConsent.setLanguage(ccLang, true);
      }
    }, 500);
  }
}

function initLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
  });
  applyLang(currentLang);
}

// setActiveNav, initScrollReveal, modal/shop mantığı — değişmeden aynı kalıyor