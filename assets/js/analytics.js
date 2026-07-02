// assets/js/analytics.js

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { dataLayer.push(arguments); };

// GA sadece izin verilince çağrılacak fonksiyon — otomatik çalışmaz
window.loadGoogleAnalytics = function () {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-V5PTPRE7V3';
  document.head.appendChild(s);

  s.onload = function () {
    gtag('js', new Date());
    gtag('config', 'G-V5PTPRE7V3');
  };
};