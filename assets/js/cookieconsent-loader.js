// assets/js/cookieconsent-loader.js

(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    analytics_storage: 'denied'
  });

  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css';
  document.head.appendChild(link);

  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';
  script.onload = initCookieConsent;
  document.head.appendChild(script);

function detectSiteLanguage() {
  var lang = (document.documentElement.getAttribute('lang') || navigator.language.slice(0, 2)).toLowerCase();
  var supported = ['tr', 'en', 'fr'];
  return supported.includes(lang) ? lang : 'en';
}

  function initCookieConsent() {
    CookieConsent.run({
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {}
      },
      onFirstConsent: function ({ cookie }) {
        if (cookie.categories.includes('analytics')) {
          gtag('consent', 'update', { analytics_storage: 'granted' });
          if (window.loadGoogleAnalytics) window.loadGoogleAnalytics();
        }
      },
      onConsent: function ({ cookie }) {
        gtag('consent', 'update', {
          analytics_storage: cookie.categories.includes('analytics') ? 'granted' : 'denied'
        });
        if (cookie.categories.includes('analytics') && window.loadGoogleAnalytics) {
          window.loadGoogleAnalytics();
        }
      },
      guiOptions: {
        consentModal: { layout: 'box', position: 'bottom left' }
      },
      language: {
        default: detectSiteLanguage(),
        translations: {
          tr: {
            consentModal: {
              title: 'Çerez Bildirimi',
              description: 'Sitemizde Google Analytics kullanıyoruz. Kabul ederseniz ziyaret verileriniz analiz amacıyla işlenir. Detaylar için <a href="/privacy.html">Gizlilik Bildirimi</a> sayfasına bakabilirsiniz.',
              acceptAllBtn: 'Kabul Et',
              acceptNecessaryBtn: 'Reddet',
              showPreferencesBtn: 'Tercihleri Yönet'
            },
            preferencesModal: {
              title: 'Çerez Tercihleri',
              acceptAllBtn: 'Tümünü Kabul Et',
              acceptNecessaryBtn: 'Tümünü Reddet',
              savePreferencesBtn: 'Tercihleri Kaydet',
              closeIconLabel: 'Kapat',
              sections: [
                { title: 'Zorunlu Çerezler', description: 'Sitenin çalışması için gerekli, kapatılamaz.', linkedCategory: 'necessary' },
                { title: 'Analitik Çerezler', description: 'Google Analytics ile ziyaretçi davranışlarını anonim şekilde analiz etmemizi sağlar.', linkedCategory: 'analytics' }
              ]
            }
          },
          en: {
            consentModal: {
              title: 'Cookie Notice',
              description: 'This site uses Google Analytics. If you accept, your visit data will be processed for analytics purposes. See our <a href="/privacy.html">Privacy Notice</a> for details.',
              acceptAllBtn: 'Accept',
              acceptNecessaryBtn: 'Reject',
              showPreferencesBtn: 'Manage Preferences'
            },
            preferencesModal: {
              title: 'Cookie Preferences',
              acceptAllBtn: 'Accept All',
              acceptNecessaryBtn: 'Reject All',
              savePreferencesBtn: 'Save Preferences',
              closeIconLabel: 'Close',
              sections: [
                { title: 'Necessary Cookies', description: 'Required for the site to function, cannot be disabled.', linkedCategory: 'necessary' },
                { title: 'Analytics Cookies', description: 'Allows us to analyze visitor behavior anonymously via Google Analytics.', linkedCategory: 'analytics' }
              ]
            }
          },
          fr: {
            consentModal: {
              title: 'Avis relatif aux cookies',
              description: 'Ce site utilise Google Analytics. Si vous acceptez, vos données de visite seront traitées à des fins d\'analyse. Voir notre <a href="/privacy.html">Avis de confidentialité</a> pour plus de détails.',
              acceptAllBtn: 'Accepter',
              acceptNecessaryBtn: 'Refuser',
              showPreferencesBtn: 'Gérer les préférences'
            },
            preferencesModal: {
              title: 'Préférences relatives aux cookies',
              acceptAllBtn: 'Tout accepter',
              acceptNecessaryBtn: 'Tout refuser',
              savePreferencesBtn: 'Enregistrer les préférences',
              closeIconLabel: 'Fermer',
              sections: [
                { title: 'Cookies nécessaires', description: 'Nécessaires au fonctionnement du site, ne peuvent pas être désactivés.', linkedCategory: 'necessary' },
                { title: 'Cookies analytiques', description: 'Nous permettent d\'analyser le comportement des visiteurs de manière anonyme via Google Analytics.', linkedCategory: 'analytics' }
              ]
            }
          }
        }
      }
    });
  }
})();