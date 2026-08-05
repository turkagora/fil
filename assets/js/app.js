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
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
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

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.navbar-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const isActive = (path.endsWith('index.html') || path === '/' || path === '')
      ? href.includes('index.html') || href === './' || href === '/'
      : path.includes(href.replace('./', '').replace('.html', '')) && href.length > 2;
    a.classList.toggle('active', isActive);
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initLangSwitcher();
  setActiveNav();
  initScrollReveal();
});

// ===== LEGAL MODAL + PAYMENT BUTTONS =====
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("legal-modal");
  const closeBtn = document.getElementById("close-legal-modal");
  const declineBtn = document.getElementById("decline-legal-btn");
  const acceptBtn = document.getElementById("accept-legal-btn");
  const buyButtons = document.querySelectorAll(".view-prices-btn");

  const shopModal = document.getElementById("shop-modal");
  const shopFrame = document.getElementById("shop-checkout-frame");
  const shopCloseBtn = document.getElementById("shop-modal-close");

  let targetUrl = "";

  if (buyButtons.length > 0 && modal) {
    buyButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        targetUrl = button.getAttribute("data-shop-url");
        modal.style.display = "flex";
      });
    });

    const closeModal = () => {
      modal.style.display = "none";
      targetUrl = "";
    };

    closeBtn.addEventListener("click", closeModal);
    declineBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    acceptBtn.addEventListener("click", () => {
      if (targetUrl) {
        if (targetUrl.startsWith("#")) {
          modal.style.display = "none";
          document.querySelector(targetUrl)?.scrollIntoView({ behavior: "smooth" });
        } else {
          // Sayfadan ayrılma yerine, shop'u modal içindeki iframe'de aç
          modal.style.display = "none";
          if (shopFrame) shopFrame.src = targetUrl;
          if (shopModal) shopModal.classList.add("show");
        }
      }
    });
  }

  // Shop modalını kapatma
  if (shopCloseBtn && shopModal) {
    shopCloseBtn.addEventListener("click", () => {
      shopModal.classList.remove("show");
      if (shopFrame) shopFrame.src = "about:blank";
    });

    shopModal.addEventListener("click", (e) => {
      if (e.target === shopModal) {
        shopModal.classList.remove("show");
        if (shopFrame) shopFrame.src = "about:blank";
      }
    });
  }
});