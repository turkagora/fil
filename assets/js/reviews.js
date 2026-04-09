// ===== TESTIMONIALS (YORUMLAR) COMPONENT =====
// Yeni yorum eklemek için REVIEWS listesine yeni bir satır eklemen yeterli.
// HTML'de iki kere kopyalamaya gerek yok, bu script sonsuz döngüyü otomatik oluşturur.

const REVIEWS = [
  { avatar: 'A', name: 'Arnaud', text: "J'ai eu plusieurs profs de turc, et Tayfun est de loin le meilleur. Méthodique, très humain et encourageant, il vous permet de progresser rapidement. Il parle aussi parfaitement français." },
  
  { avatar: 'E', name: 'Elsa', text: "I really enjoy Tayfun’s lessons. His classes are very engaging... His communication in both Turkish and English is excellent. He turns our conversations into valuable learning moments." },
  
  { avatar: 'S', name: 'Selena', text: "Je prend un cours par semaine avec Tayfun, je progresse très vite et j’ai pris confiance en moi à l’oral. Les supports de cours sont très intéressants et ludiques. Vous ne serez pas déçus 😊" },
  
  { avatar: 'T', name: 'Tamás', text: "Always well prepared with a clear and visual teaching style. Excellent explanations, very fun classes and mastery of many languages, it’s always a pleasure to learn Turkish with him!" },
  
  { avatar: 'N', name: 'Noémie', text: "L'approche pédagogique de Tayfun est efficace et motivante ! Il sait s'adapter à mon besoin et rendre les cours dynamiques et interactifs. Grâce à ses explications claires, j'ai fait beaucoup de progrès." },
  
  { avatar: 'S', name: 'Sabrina', text: "I highly recommend the lessons with Tayfun. He is a very nice and patient teacher. The lessons are well prepared and varied. Effective learning that is also fun." },
  
  { avatar: 'S', name: 'S.', text: "Tayfun est un enseignant très attentif et agréable ! Il adapte facilement sa manière de parler en fonction de mon niveau et de mes besoins. Je le recommande vivement !" },
  
  { avatar: 'A', name: 'Anonymous', text: "After many lessons, my opinion of Tayfun (already very positive after the trial lesson) has further improved. Well done, Tayfun! You are really among the best." }
];

function buildMarqueeGroup() {
  return REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${r.avatar}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-stars">★★★★★</div>
        </div>
      </div>
      <p class="review-text">${r.text}</p>
    </div>
  `).join('');
}

function injectTestimonials() {
  const container = document.getElementById('reviews-container');
  if (!container) return;

  container.innerHTML = `
    <section class="testimonials-section" aria-labelledby="testimonials-heading">
      <div class="section-inner" style="max-width: var(--content-wide); margin: 0 auto; padding: 0 var(--space-6);">
        <span class="section-label reveal" data-i18n="reviews_label">Student Reviews</span>
        <h2 class="section-title reveal" id="testimonials-heading">
          <a href="https://preply.in/TAYFUN6EN1634009210?ts=17756744" target="_blank" rel="noopener noreferrer" class="preply-title-link">
            <span data-i18n="reviews_title">What my students say</span>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </h2>
      </div>
      
      <div class="marquee-wrapper reveal">
        <!-- Orijinal Grup -->
        <div class="marquee">
          ${buildMarqueeGroup()}
        </div>
        <!-- Sonsuz Döngü İçin Kopya Grup -->
        <div class="marquee" aria-hidden="true">
          ${buildMarqueeGroup()}
        </div>
      </div>
    </section>
  `;
}

// app.js'den ÖNCE çalışması için DOM yüklendiğinde tetikliyoruz.
document.addEventListener('DOMContentLoaded', injectTestimonials);