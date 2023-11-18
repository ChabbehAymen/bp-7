/*
 *
 */
let rateRadios = document.querySelectorAll('input[name="rate-radio-group"]');
let main = document.querySelector("main");
let xhr = new XMLHttpRequest();
xhr.open("GET", "/data/resturants_data.json");

xhr.onload = function () {
  let allRestos = JSON.parse(xhr.responseText);
  createRestos(allRestos);
  filterByRate(allRestos);
  createSpecialitySelect();
  filterBySpeciality(allRestos);
  searchInRestos();
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

// creates my custom element for each object of the fetched json data
function createRestoCard(id, logo, name, rate, speciality) {
  let restoCard = document.createElement("resto-card");
  restoCard.setAttribute("id", id);
  restoCard.setAttribute("logo", logo);
  restoCard.setAttribute("name", name);
  restoCard.setAttribute("rate", rate);
  restoCard.setAttribute("speciality", speciality);
  return restoCard;
}

function createSpecialitySelect() {
  let restos = document.querySelectorAll("main resto-card");
  for (let resto of restos) {
    let speciality = resto.getAttribute("speciality");
    if (!isOptionCreated(speciality)) {
      insertOption(speciality);
    }
  }
}

/*
 this function checks whether the passed speciality allredy have a 
 created option in the select
*/
function isOptionCreated(value) {
  let createdOptions = document.querySelectorAll("header select option");
  for (const option of createdOptions) {
    if (value == option.value) {
      return true;
    }
  }
  return false;
}

function insertOption(speciality) {
  document.querySelector("header select").innerHTML += `
  <option value="${speciality}">${speciality}</option>
  `;
}

function filterByRate(allRestos) {
  rateRadios.forEach((radio) => {
    radio.onclick = function () {
      document.querySelector("header select").value = "all-speciality";
      switch (radio.value) {
        case radioStates.allRestos:
          createRestos(allRestos);
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

// filters resturants to only have rate less than 3
function filterLessOfTreeRateRestos(allRestos) {
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

function filterBySpeciality(allRestos) {
  document
    .querySelector("header select")
    .addEventListener("change", (event) => {
      document.querySelector("#all-restos").checked = true;
      filterRestos(allRestos, event.target.value);
    });
}

function filterRestos(allRestos, speciality) {
  main.innerHTML = "";
  for (const resto of allRestos) {
    if (speciality == "all-speciality") {
      createRestos(allRestos);
    } else if (resto.specialty == speciality) {
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

function searchInRestos() {
  document.querySelector("#search-bar").addEventListener("keyup", (event) => {
    document.querySelectorAll("resto-card").forEach((restoCard) => {
      if (
        restoCard.getAttribute("name").includes(event.target.value) &&
        event.target.value != ""
      ) {
        restoCard.style.display = "block";
      } else if (
        !restoCard.getAttribute("name").includes(event.target.value) &&
        event.target.value != ""
      )
        restoCard.style.display = "none";
      if (event.target.value == '') restoCard.style.display = "block";
    });
  });
}

// this object represents the 4 states of my radio buttons to filtter by
const radioStates = {
  allRestos: "all",
  lessThanTree: "-3",
  threeToFour: "3-4",
  fourToFive: "4-5",
};

// TODO sorts The element depending on there rate in the page
