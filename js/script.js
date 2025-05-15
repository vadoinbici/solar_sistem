
const carousel = document.querySelector('.carousel');
const container = document.querySelector('.carousel-container');
const cards = Array.from(document.querySelectorAll('.planet-card'));


const navigableIndexes = cards
  .map((_, i) => i)
  .filter(i => {
    const c = cards[i];
    return !c.classList.contains('invisible')
        && !c.classList.contains('planet-sole');
  });

let navPos = 0;                          
let index  = navigableIndexes[navPos];  

function updateCarousel() {
  const cw    = container.offsetWidth;
  const cardW = cw * 0.5;               

  const shift = index * cardW - (cw - cardW) / 2;
  carousel.style.transform = `translateX(-${shift}px)`;

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

window.addEventListener('keydown', e => {
  if      (e.key === 'ArrowRight') nextPlanet();
  else if (e.key === 'ArrowLeft')  prevPlanet();
  else if (e.key === 'Enter')      openPlanetPage();
});

document.getElementById('next')?.addEventListener('click', nextPlanet);
document.getElementById('prev')?.addEventListener('click', prevPlanet);


window.addEventListener('load', () => {
  navPos = 0;
  index  = navigableIndexes[navPos];
  updateCarousel();
});
window.addEventListener('resize', updateCarousel);



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


  let prefix = "";
  if (path.includes("/satelliti/")) {
    prefix = "../";
  } else if (path.includes("/pianeti/")) {
    prefix = "../";
  } else {
    prefix = ""; 
  }


  if (btnHome) {
    btnHome.href = prefix + "index.html";
  }


  if (btnPianeti) {
    btnPianeti.href = prefix + "pianeti.html";
  }

  // Pulsante SATELLITI (link a pagina casuale)
// Pulsante SATELLITI → va alla pagina del pianeta attuale
if (btnSatelliti) {
  const pathParts = window.location.pathname.split("/");
  let planetName = "";

  // Estrai il nome del pianeta dalla URL attuale (es: pianeti/giove.html)
  for (let i = pathParts.length - 1; i >= 0; i--) {
    const part = pathParts[i];
    if (part.endsWith(".html") && part !== "index.html") {
      planetName = part.replace(".html", "").toLowerCase();
      break;
    }
  }

  // Se non trovi un pianeta valido, fallback su "giove"
  if (!planetName || planetName === "pianeti") {
    planetName = "giove";
  }

  // Calcola il percorso corretto in base al livello
  let prefix = "";
  if (window.location.pathname.includes("/pianeti/")) {
    prefix = "../menu-satelliti/";
  } else if (window.location.pathname.includes("/menu-satelliti/")) {
    prefix = "";
  } else {
    prefix = "menu-satelliti/";
  }

  btnSatelliti.href = `${prefix}${planetName}-satelliti.html`;
}

});

