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
                 