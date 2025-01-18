const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.card');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// Track the current scroll position
let scrollPosition = 0;

// Scroll amount for each arrow click
const scrollAmount = 200;

// Update card sizes based on position
function updateCardSizes() {
  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const containerRect = carousel.parentElement.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;

    // If the card is near the center, make it active
    if (Math.abs(cardCenter - containerCenter) < cardRect.width / 2) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

// Scroll left
leftArrow.addEventListener('click', () => {
  scrollPosition -= scrollAmount;
  carousel.style.transform = `translateX(${scrollPosition}px)`;
  updateCardSizes();
});

// Scroll right
rightArrow.addEventListener('click', () => {
  scrollPosition += scrollAmount;
  carousel.style.transform = `translateX(${scrollPosition}px)`;
  updateCardSizes();
});

// Initial sizing
updateCardSizes();


function scrollToPortfolio() {
  const section = document.getElementById("portfolio");
  section.scrollIntoView({ behavior: "smooth" });
}


// script.js
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}


