// js/script.js

// ——— 1) SETUP CAROUSEL AVANZATO ———
const carousel = document.querySelector('.carousel');
const container = document.querySelector('.carousel-container');
const cards = Array.from(document.querySelectorAll('.planet-card'));

// Crea una lista di indici navigabili: esclude invisibili e il pianeta-sole
const navigableIndexes = cards
  .map((_, i) => i)
  .filter(i => {
    const c = cards[i];
    return !c.classList.contains('invisible')
        && !c.classList.contains('planet-sole');
  });

// Stato di navigazione
let navPos = 0;                          // posizione dentro navigableIndexes
let index  = navigableIndexes[navPos];  // indice reale in cards[]

function updateCarousel() {
  const cw    = container.offsetWidth;
  const cardW = cw * 0.5;               // ogni card occupa il 50% della viewport
  // shift per centrare la card corrente
  const shift = index * cardW - (cw - cardW) / 2;
  carousel.style.transform = `translateX(-${shift}px)`;

  // aggiorna classi .active
  cards.forEach(c => c.classList.remove('active'));
  cards[index].classList.add('active');
}

function nextPlanet() {
  if (navPos < navigableIndexes.length - 1) {
    navPos++;
    index = navigableIndexes[navPos];
    updateCarousel();
  }
}

function prevPlanet() {
  if (navPos > 0) {
    navPos--;
    index = navigableIndexes[navPos];
    updateCarousel();
  }
}

function openPlanetPage() {
  const card = cards[index];
  const name = card.querySelector('.planet-name')
                   .textContent.toLowerCase()
                   .normalize("NFD")
                   .replace(/[\u0300-\u036f]/g, "")
                   .replace(/\s+/g, "-");
  window.location.href = `pianeti/${name}.html`;
}

// Eventi tastiera e click
window.addEventListener('keydown', e => {
  if      (e.key === 'ArrowRight') nextPlanet();
  else if (e.key === 'ArrowLeft')  prevPlanet();
  else if (e.key === 'Enter')      openPlanetPage();
});

document.getElementById('next')?.addEventListener('click', nextPlanet);
document.getElementById('prev')?.addEventListener('click', prevPlanet);

// Init su load e aggiorna su resize
window.addEventListener('load', () => {
  navPos = 0;
  index  = navigableIndexes[navPos];
  updateCarousel();
});
window.addEventListener('resize', updateCarousel);


// ——— 2) SCROLL‑TRIGGER PER PARAGRAFI ———
function toggleParagraphsOnScroll() {
  const paragraphs = document.querySelectorAll('.scroll-text p');
  paragraphs.forEach(p => {
    const rect = p.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0) {
      p.classList.add('visible');
    } else {
      p.classList.remove('visible');
    }
  });
}

window.addEventListener('load',   toggleParagraphsOnScroll);
window.addEventListener('scroll', toggleParagraphsOnScroll);

document.addEventListener('DOMContentLoaded', () => {
  const btnHome      = document.getElementById('btn-home');
  const btnPianeti   = document.getElementById('btn-pianeti');
  const btnSatelliti = document.getElementById('btn-satelliti');

  const pages = [
    "luna.html", "io.html", "europa.html", "ganimede.html", 
    "callisto.html", "titano.html"
  ];

  const path = window.location.pathname;

  // Determina il livello del path per impostare i link corretti
  let prefix = "";
  if (path.includes("/satelliti/")) {
    prefix = "../";
  } else if (path.includes("/pianeti/")) {
    prefix = "../";
  } else {
    prefix = ""; // index o root
  }

  // Pulsante HOME
  if (btnHome) {
    btnHome.href = prefix + "index.html";
  }

  // Pulsante PIANETI
  if (btnPianeti) {
    btnPianeti.href = prefix + "pianeti.html";
  }

  // Pulsante SATELLITI (link a pagina casuale)
  if (btnSatelliti) {
    btnSatelliti.addEventListener('click', function (e) {
      e.preventDefault();
      const random = pages[Math.floor(Math.random() * pages.length)];
      window.location.href = prefix + "satelliti/" + random;
    });
  }
});

