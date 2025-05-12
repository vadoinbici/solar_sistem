const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.planet-card');
let index = 0;

function updateCarousel() {
  const cardWidth = window.innerWidth;
  carousel.style.transform = `translateX(${-index * cardWidth}px)`;

  cards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
}

function nextPlanet() {
  if (index < cards.length - 1) {
    index++;
    updateCarousel();
  }
}

function prevPlanet() {
  if (index > 0) {
    index--;
    updateCarousel();
  }
}

// Navigazione con tastiera
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextPlanet();
  if (e.key === 'ArrowLeft') prevPlanet();
});

// Navigazione con pulsanti visibili a schermo
document.getElementById('next').addEventListener('click', nextPlanet);
document.getElementById('prev').addEventListener('click', prevPlanet);

window.addEventListener('resize', updateCarousel);
window.addEventListener('load', updateCarousel);
