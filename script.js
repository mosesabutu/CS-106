const container = document.getElementById("product-grid");
const trusteePreview = document.getElementById("trustee-grid");

const data = [
  {
    img: "product/images/bomber.jpg",
    name: "Urban Bomber Jacket",
    price: "$120",
  },
  {
    img: "product/images/studs.jpg",
    name: "Diamond Studs",
    price: "$250",
  },
  {
    img: "product/images/high-tops.jpg",
    name: "Retro High-Tops",
    price: "$110",
  },
  {
    img: "product/images/clutch.jpg",
    name: "Midnight Clutch",
    price: "$85",
  },
];

const trustee = [
  {
    img: "trustees/images/moses.webp",
    name: "MOSES ABUTU",
    position: "Chief Executive Officer (CEO)",
  },
  {
    img: " trustees/images/ayomide.webp",
    name: "AYOMIDE ALLEN",
    position: "Chief Creative Officer (CCO)",
  },
  {
    img: "trustees/images/olushola.webp",
    name: "OLUSHOLA MAJESTY",
    position: "Chief Operating Officer (COO)",
  },
  {
    img: "trustees/images/praise.webp",
    name: "PRAISE ONWUERINGO",
    position: "Chief Technical Officer (CTO)",
  },
];

data.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <div class="product-info">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    </div>
  `;

  container.appendChild(card);
});

trustee.forEach((truste) => {
  const card = document.createElement("div");
  card.className = "trustee-card";

  card.innerHTML = `
          <img src="${truste.img}" alt="${truste.name}">
          <div class="trustee-info">
            <h3>${truste.name}</h3>
            <p>${truste.position.toUpperCase()}</p>
          </div>
  `;

  trusteePreview.appendChild(card);
});

const hero = document.getElementById("hero");
const images = ["src/1.jpg", "src/2.jpg", "src/3.jpg", "src/4.jpg"];
let currentIndex = 0;
let autoCycle = null;

// 1. The Core Update Function
function updateBg() {
  const nextImageUrl = images[currentIndex];
  const tempImage = new Image();
  tempImage.src = nextImageUrl;
  tempImage.onload = () => {
    hero.style.backgroundImage = `url(${nextImageUrl})`;
  };
}

// 2. Logic to Start/Stop the slider based on screen size
function handleResponsiveness() {
  const isMobile = window.innerWidth <= 850;

  if (isMobile && !autoCycle) {
    // Start Mobile Slider
    autoCycle = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateBg();
    }, 5000);
  } else if (!isMobile && autoCycle) {
    // Stop Slider for Desktop & Reset to CSS default
    clearInterval(autoCycle);
    autoCycle = null;
    hero.style.backgroundImage = ""; // Removes inline style so CSS takes over
  }
}

// Initialize on load and on resize
window.addEventListener("resize", handleResponsiveness);
handleResponsiveness();

// 3. Swipe Logic (Only active if on mobile)
let touchStartX = 0;
hero.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true },
);

hero.addEventListener(
  "touchend",
  (e) => {
    if (window.innerWidth > 850) return; // Ignore swipes on desktop

    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      currentIndex = (currentIndex + 1) % images.length;
    } else if (touchEndX - touchStartX > swipeThreshold) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else {
      return;
    }

    updateBg();
    // Reset timer on manual swipe
    clearInterval(autoCycle);
    autoCycle = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateBg();
    }, 5000);
  },
  { passive: true },
);
