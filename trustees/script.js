// 1. Data Array (Trustees)
const trustees = [
  {
    name: "MOSES ABUTU",
    position: "Chief Executive Officer (CEO)", // leader 1
    email: "m.abutu@miva.edu.ng",
    matric: "2025/A/CSC/0179",
    img: "images/moses.webp",
  },
  {
    name: "AYOMIDE ALLEN",
    position: "Chief Creative Officer (CCO)", // leader 2
    email: "ayomide.allen4240@miva.edu.ng",
    matric: "2025/A/CSC/0015",
    img: "images/ayomide.webp",
  },
  {
    name: "OLUSHOLA MAJESTY",
    position: "Chief Operating Officer (COO)", // member3
    email: "o.majesty@miva.edu.ng",
    matric: "2025/A/CSC/0162",
    img: "images/olushola.webp",
  },
  {
    name: "PRAISE ONWUERINGO",
    position: "Chief Technical Officer (CTO)", // member4
    email: "p.onwueringo4828@miva.edu.ng",
    matric: "2025/A/CSC/0296",
    img: "images/praise.webp",
  },
  {
    name: "OSEBUOHIEN IMAFIDON-IGNATIUS",
    position: "Director of Brand Strategy", // member5
    email: "o.imafidon-ignatius5323@miva.edu.ng",
    matric: "2025/A/CSC/0153",
    img: "images/ose.webp",
  },
  {
    name: "MUHAMMAD AHMAD",
    position: "Lead Software Engineer", // member 6
    email: "m.ahmad4386@miva.edu.ng",
    matric: "2025/A/SENG/0276",
    img: "images/muhammed.webp",
  },
  {
    name: "MICHAEL TOM",
    position: "Lead Sales", // member 8
    email: "m.tom3391@miva.edu.ng",
    matric: "2025/A/DSC/0026",
    img: "images/tom.png",
  },
  {
    name: "EMMANUEL ADEWOYE",
    position: "Secretary", // member 9
    email: "emmanuel.adewoye@miva.edu.ng",
    matric: "2024/A/CSC/0122",
    img: "images/emma.webp",
  },
  {
    name: "JOSEPH UBA",
    position: "Treasurer", // member 10
    email: "j.uba3146@miva.edu.ng",
    matric: "2025/A/CSC/0246",
    img: "images/uba.webp",
  },
  {
    name: "VICTOR NNAH",
    position: "Human Resources", // member 7
    email: "V.nnah3519@miva.edu.ng",
    matric: "2025/A/CSC/0319",
    img: "images/victor.webp",
  },
];

//

const trusteesGrid = document.getElementById("boardGrid");

trustees.forEach((member) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${member.img}" alt="${member.name}">
    <div class="card-content">
      <p class="name">${member.name}</p>
      <div class="role">${member.position.toLocaleUpperCase()} </div>
      <div class="email">${member.email}</div>
      <div class="id-badge">${member.matric}</div>
      </div>
      `;

  trusteesGrid.appendChild(card);
});
