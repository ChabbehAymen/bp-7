let allRestos = [];
let xhr = new XMLHttpRequest();
xhr.responseType = "json";
xhr.open("GET", "/data/resturants_data.json");

xhr.onload = function () {
  for (let resto of xhr.response) {
    allRestos.push(resto);
  }
};
xhr.send();

for (let resto of allRestos) {
  document
    .querySelector("main")
    .appendChild(
      createRestoCard(
        resto.id,
        resto.logo,
        resto.name,
        resto.rate,
        resto.speciality
      )
    );
}

function createRestoCard(id, logo, name, rate, speciality) {
  let restoCard = document.createElement("resto-card");
  restoCard.setAttribute("id", id);
  restoCard.setAttribute("logo", logo);
  restoCard.setAttribute("name", name);
  restoCard.setAttribute("rate", rate);
  restoCard.setAttribute("speciality", speciality);
  return restoCard;
}
