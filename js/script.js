// js/script.js

const carousel = document.querySelector('.carousel');
const cards    = Array.from(document.querySelectorAll('.planet-card'));

// Costruiamo una lista degli indici "navigabili": tutti i cards tranne
// - invisibili (class 'invisible')
// - il Sole (class 'planet-sole')
const navigableIndexes = cards
  .map((c, i) => i)
  .filter(i => {
    const c = cards[i];
    if (c.classList.contains('invisible')) return false;
    if (c.classList.contains('planet-sole')) return false;
    return true;
  });

// Parametri di navigazione
let navPos = 0;              // posizione nella lista navigableIndexes
let index  = navigableIndexes[navPos];  // indice reale nella cards[]

function updateCarousel() {
  const container = document.querySelector('.carousel-container');
  const cw        = container.offsetWidth;
  const cardW     = cw * 0.5; // ogni card è il 50% della viewport

  // Calcola shift per centrare cards[index]
  const shift = index * cardW - (cw - cardW) / 2;
  carousel.style.transform = `translateX(-${shift}px)`;

  // Aggiorna classi active
  cards.forEach(c => c.classList.remove('active'));
  cards[index].classList.add('active');
}

// Vai al pianeta successivo nella lista navigabile
function nextPlanet() {
  if (navPos < navigableIndexes.length - 1) {
    navPos++;
    index = navigableIndexes[navPos];
    updateCarousel();
  }
}

// Vai al pianeta precedente nella lista navigabile
function prevPlanet() {
  if (navPos > 0) {
    navPos--;
    index = navigableIndexes[navPos];
    updateCarousel();
  }
}

// Apri la pagina del pianeta selezionato
function openPlanetPage() {
  const card = cards[index];
  const name = card.querySelector('.planet-name').textContent.toLowerCase();
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
  window.location.href = `pianeti/${slug}.html`;
}

// Gestione input tastiera
window.addEventListener('keydown', e => {
  if      (e.key === 'ArrowRight') nextPlanet();
  else if (e.key === 'ArrowLeft')  prevPlanet();
  else if (e.key === 'Enter')      openPlanetPage();
});

// All’avvio e al resize, centriamo il pianeta iniziale
window.addEventListener('load', () => {
  // posizioniamo navPos su Mercurio (primo navigable)
  navPos = 0;
  index  = navigableIndexes[navPos];
  updateCarousel();
});
window.addEventListener('resize', updateCarousel);

// Funzione per mostrare o nascondere i paragrafi singolarmente in base alla posizione
function toggleParagraphsOnScroll() {
const paragraphs = document.querySelectorAll('.scroll-text p');
paragraphs.forEach(paragraph => {
  const rect = paragraph.getBoundingClientRect();
  // Se è visibile nella viewport, mostralo
  if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0) {
    paragraph.classList.add('visible');
  } else {
    paragraph.classList.remove('visible');
  }
});
}

// All'avvio, nascondi tutto e verifica visibilità
window.addEventListener('load', toggleParagraphsOnScroll);

// Aggiorna visibilità a ogni scroll
window.addEventListener('scroll', toggleParagraphsOnScroll);