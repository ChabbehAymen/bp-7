/*
 *
 */
let rateRadios = document.querySelectorAll('input[name="rate-radio-group"]');
let specialitySelect = document.querySelector("header select[name='speciality-select']");
let rateSelect = document.querySelector("header select[name='rate-select']");
let main = document.querySelector("main");
let allRestoCards;
let request = new XMLHttpRequest();
request.open("GET", "/data/resturants_data.json");

request.onload = function () {
  let allRestos = JSON.parse(request.responseText);
  createRestos(allRestos);
  createSpecialitySelect();
  allRestoCards = document.querySelectorAll("resto-card");
};
request.send();

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
  restoCard.setAttributes(
    ["id", "logo", "name", "rate", "speciality"],
    [id, logo, name, rate, speciality]
  );
  return restoCard;
}

// this function automates seting th attrutes for the cards
window.HTMLElement.prototype.setAttributes = function (attributeskey,attributesValue) {
  for (let i = 0; i < attributeskey.length; i++) {
    this.setAttribute(attributeskey[i], attributesValue[i]);
  }
};

// create the the specialities options depending on the data
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
  specialitySelect.innerHTML += `
  <option value="${speciality}">${speciality}</option>
  `;
}

rateRadios.forEach((radio) => {
  radio.addEventListener("click", (event) => {
    filterByRate(event.target);
  });
});

rateSelect.addEventListener("change", (event) => {
  filterByRate(event.target);
});

function filterByRate(radio) {
  specialitySelect.value = "all-speciality";
  allRestoCards.forEach((restoCard) => {
    let restoCardRate = restoCard.getAttribute("rate");
    switch (radio.value) {
      case rateStateFiltersStutus.allRestos:
        restoCard.style.display = "block";
        break;
      case rateStateFiltersStutus.lessThanTree:
        filterLessOfTreeRateRestos(restoCard, restoCardRate);
        break;
      case rateStateFiltersStutus.threeToFour:
        filterFormThreeToFourRate(restoCard, restoCardRate);
        break;
      case rateStateFiltersStutus.fourToFive:
        filterFormFourToFiveRate(restoCard, restoCardRate);
        break;
    }
  });
}

// filters resturants to only have rate less than 3
function filterLessOfTreeRateRestos(restoCard, rate) {
  if (rate < 3) {
    restoCard.style.display = "block";
  } else restoCard.style.display = "none";
}

// filters resturants to only have rate bettween 3 and 4
function filterFormThreeToFourRate(restoCard, rate) {
  if (rate > 3 && rate <= 4) {
    restoCard.style.display = "block";
  } else restoCard.style.display = "none";
}

// filter the resturants to only have rate above 4
function filterFormFourToFiveRate(restoCard, rate) {
  if (rate > 4 && rate <= 5) {
    restoCard.style.display = "block";
  } else restoCard.style.display = "none";
}

specialitySelect.addEventListener("change", (event) => {
  rateSelect.value = rateStateFiltersStutus.allRestos;
  filterBySpeciality(event);
});

function filterBySpeciality(event) {
  document.querySelector("#all-restos").checked = true;
  filterRestos(event.target.value);
}

function filterRestos(speciality) {
  for (const resto of allRestoCards) {
    if (speciality == "all-speciality") {
      resto.style.display = "block";
    } else if (resto.getAttribute("speciality") == speciality) {
      resto.style.display = "block";
    } else resto.style.display = "none";
  }
}

document.querySelector("#search-bar").addEventListener("keyup", (event) => {
  searchInRestos(event);
});

function searchInRestos(event) {
  allRestoCards.forEach((restoCard) => {
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
    if (event.target.value == "") restoCard.style.display = "block";
  });
}

// this object represents the 4 states of my radio buttons to filtter by
const rateStateFiltersStutus = {
  allRestos: "all",
  lessThanTree: "-3",
  threeToFour: "3-4",
  fourToFive: "4-5",
};

// TODO sorts The element depending on there rate in the page
