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
let isPaused = false;
let isSliderActive = false;

// elements (only exist on mobile)
let currentSlide, nextSlide, dotsContainer;

// drag state
let startX = 0;
let deltaX = 0;
let isDragging = false;

const isMobileView = () => window.innerWidth <= 850;

// --------------------
// INIT / DESTROY
// --------------------
function initMobileSlider() {
  if (isSliderActive) return;
  isSliderActive = true;

  currentSlide = document.createElement("div");
  currentSlide.className = "slide current";

  nextSlide = document.createElement("div");
  nextSlide.className = "slide next";

  dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";

  hero.appendChild(currentSlide);
  hero.appendChild(nextSlide);
  hero.appendChild(dotsContainer);

  currentSlide.style.backgroundImage = `url(${images[currentIndex]})`;

  createDots();
  updateDots();
  startAutoCycle();
}

function destroyMobileSlider() {
  if (!isSliderActive) return;
  isSliderActive = false;

  stopAutoCycle();

  currentSlide.remove();
  nextSlide.remove();
  dotsContainer.remove();
}

// --------------------
// DOTS
// --------------------
function createDots() {
  dotsContainer.innerHTML = "";

  images.forEach((_, index) => {
    const dot = document.createElement("span");

    dot.addEventListener("click", () => {
      if (!isSliderActive) return;

      currentIndex = index;
      currentSlide.style.backgroundImage = `url(${images[currentIndex]})`;
      updateDots();

      stopAutoCycle();
      startAutoCycle();
    });

    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  if (!isSliderActive) return;

  Array.from(dotsContainer.children).forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// --------------------
// AUTO CYCLE
// --------------------
function startAutoCycle() {
  if (autoCycle || !isSliderActive) return;

  autoCycle = setInterval(() => {
    if (isPaused || !isSliderActive) return;
    goToSlide("next");
  }, 5000);
}

function stopAutoCycle() {
  clearInterval(autoCycle);
  autoCycle = null;
}

// --------------------
// SLIDE CHANGE
// --------------------
function goToSlide(direction) {
  if (!isSliderActive) return;

  const newIndex =
    direction === "next"
      ? (currentIndex + 1) % images.length
      : (currentIndex - 1 + images.length) % images.length;

  nextSlide.style.backgroundImage = `url(${images[newIndex]})`;

  nextSlide.style.transform =
    direction === "next" ? "translateX(100%)" : "translateX(-100%)";

  requestAnimationFrame(() => {
    currentSlide.style.transition = "transform 0.4s ease";
    nextSlide.style.transition = "transform 0.4s ease";

    currentSlide.style.transform =
      direction === "next" ? "translateX(-100%)" : "translateX(100%)";

    nextSlide.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    currentSlide.style.transition = "";
    nextSlide.style.transition = "";

    currentSlide.style.transform = "translateX(0)";
    currentSlide.style.backgroundImage = `url(${images[newIndex]})`;

    nextSlide.style.transform = "";

    currentIndex = newIndex;
    updateDots();
  }, 400);
}

// --------------------
// DRAG SYSTEM
// --------------------
hero.addEventListener("touchstart", (e) => {
  if (!isSliderActive) return;

  startX = e.touches[0].clientX;
  isDragging = true;
  isPaused = true;

  currentSlide.style.transition = "none";
  nextSlide.style.transition = "none";
});

hero.addEventListener("touchmove", (e) => {
  if (!isDragging || !isSliderActive) return;

  const currentX = e.touches[0].clientX;
  deltaX = currentX - startX;

  const resistance = 0.4;
  const move = deltaX * resistance;

  currentSlide.style.transform = `translateX(${move}px)`;

  if (deltaX < 0) {
    nextSlide.style.backgroundImage = `url(${images[(currentIndex + 1) % images.length]})`;
    nextSlide.style.transform = `translateX(${window.innerWidth + move}px)`;
  } else {
    nextSlide.style.backgroundImage = `url(${images[(currentIndex - 1 + images.length) % images.length]})`;
    nextSlide.style.transform = `translateX(${-window.innerWidth + move}px)`;
  }
});

hero.addEventListener("touchend", () => {
  if (!isDragging || !isSliderActive) return;

  isDragging = false;

  const threshold = window.innerWidth * 0.2;

  currentSlide.style.transition = "transform 0.3s ease";
  nextSlide.style.transition = "transform 0.3s ease";

  if (deltaX < -threshold) {
    currentSlide.style.transform = "translateX(-100%)";
    nextSlide.style.transform = "translateX(0)";
    currentIndex = (currentIndex + 1) % images.length;
  } else if (deltaX > threshold) {
    currentSlide.style.transform = "translateX(100%)";
    nextSlide.style.transform = "translateX(0)";
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  } else {
    currentSlide.style.transform = "translateX(0)";
    nextSlide.style.transform = "";
    isPaused = false;
    return;
  }

  setTimeout(() => {
    currentSlide.style.transition = "";
    nextSlide.style.transition = "";

    currentSlide.style.transform = "translateX(0)";
    currentSlide.style.backgroundImage = `url(${images[currentIndex]})`;

    nextSlide.style.transform = "";

    updateDots();

    isPaused = false;
    stopAutoCycle();
    startAutoCycle();
  }, 300);
});

// --------------------
// RESPONSIVENESS
// --------------------
function handleResponsiveness() {
  if (isMobileView()) {
    initMobileSlider();
  } else {
    destroyMobileSlider();
  }
}

window.addEventListener("resize", handleResponsiveness);
handleResponsiveness();
