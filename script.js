/*
 *
 */
let rateRadios = document.querySelectorAll('input[name="rate-radio-group"]');
let xhr = new XMLHttpRequest();
xhr.open("GET", "/data/resturants_data.json");

xhr.onload = function () {
  let allRestos = JSON.parse(xhr.responseText);
  createRestos(allRestos);
  filterByRate(allRestos);

};
xhr.send();

function createRestos(allRestos) {
  document.querySelector("main").innerHTML = "";
  for (let resto of allRestos) {
    document
      .querySelector("main")
      .appendChild(
        createRestoCard(
          resto.id,
          resto.logo,
          resto.name,
          resto.note,
          resto.specialty
        )
      );
  }
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
function filterByRate(allRestos) {
  rateRadios.forEach((radio) => {
    radio.onclick = function () {
      switch (radio.value) {
        case radioStates.allRestos:
          presentAllRestos(allRestos);
          break;
        case radioStates.lessThanTree:
          filterLessOfTreeRateRestos(allRestos);
          break;
        case radioStates.threeToFour:
          filterFormThreeToFourRate(allRestos);
          break;
        case radioStates.fourToFive:
          filterFormFourToFiveRate(allRestos);
          break;
        default:
          break;
      }
    };
  });
}
function presentAllRestos(allRestos) {
  createRestos(allRestos);
}

// filters resturants to only have rate less than 3
function filterLessOfTreeRateRestos(allRestos) {
  let main = document.querySelector("main");
  main.innerHTML = "";
  for (const resto of allRestos) {
    if (resto.note < 3) {
      main.appendChild(
        createRestoCard(
          resto.id,
          resto.logo,
          resto.name,
          resto.note,
          resto.specialty
        )
      );
    }
  }
}

// filters resturants to only have rate bettween 3 and 4
function filterFormThreeToFourRate(allRestos) {
  let main = document.querySelector("main");
  main.innerHTML = "";
  for (const resto of allRestos) {
    if (resto.note > 3 && resto.note <= 4) {
      main.appendChild(
        createRestoCard(
          resto.id,
          resto.logo,
          resto.name,
          resto.note,
          resto.specialty
        )
      );
    }
  }
}

// filter the resturants to only have rate above 4
function filterFormFourToFiveRate(allRestos) {
  let main = document.querySelector("main");
  main.innerHTML = "";
  for (const resto of allRestos) {
    if (resto.note > 4 && resto.note <= 5) {
      main.appendChild(
        createRestoCard(
          resto.id,
          resto.logo,
          resto.name,
          resto.note,
          resto.specialty
        )
      );
    }
  }
}
// this object represents the 4 states of my radio buttons to filtter by
const radioStates = {
  allRestos: "all",
  lessThanTree: "-3",
  threeToFour: "3-4",
  fourToFive: "4-5",
};
