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
    position: "CEO/Founder",
  },
  {
    img: " trustees/images/ayomide.webp",
    name: "AYOMIDE ALLEN",
    position: "CCO/Co-Founder",
  },
  {
    img: "trustees/images/olushola.webp",
    name: "OLUSHOLA MAJESTY",
    position: "Lead Sotware Engineer",
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
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();
