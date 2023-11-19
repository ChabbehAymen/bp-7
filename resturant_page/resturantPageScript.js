/*
 *
 */
let selectedItemId = localStorage.getItem("selectedItemId");
let titleTextHolder = document.querySelector("header h1");
let rateTextHolder = document.querySelector("header h3 span");
let logoHolder = document.querySelector("header img");
let availableHoursHolders = document.querySelectorAll(
  "main #hours-section > div > div span"
);
let locationTextHolder = document.querySelector("#location-section i");
let websiteTextHolder = document.querySelector('footer > div .links h3:first-child');

let xhr = new XMLHttpRequest();
xhr.open("GET", "/data/resturants_data.json");

xhr.onload = function () {
  let response = JSON.parse(xhr.response);
  let selectedItem = getRestoById(response);
  setTitleName(selectedItem.name);
  setRateAndSpeciality(
    ` ${selectedItem.note} | ${selectedItem.specialty} | ${selectedItem.phone}`
  );
  setLogo(selectedItem.logo);
  setHours([
    formatDayOfHours(selectedItem.hours.monday,'Monday'),
    formatDayOfHours(selectedItem.hours.tuesday, 'Tuesday'),
    formatDayOfHours(selectedItem.hours.wednesday, 'Wednesday'),
    formatDayOfHours(selectedItem.hours.thursday, 'Thursday'),
    formatDayOfHours(selectedItem.hours.friday, 'Friday'),
    formatDayOfHours(selectedItem.hours.saturday, 'Saturday'),
    formatDayOfHours(selectedItem.hours.sunday, 'Sunday'),
  ]);
  setLocation(selectedItem.address);
  setWebSitelink(selectedItem.website);
};
xhr.send();

function getRestoById(allRestos) {
  for (let resto of allRestos) {
    if (resto.id == selectedItemId) return resto;
  }
}

function setTitleName(name) {
  titleTextHolder.innerText = name;
}

function setRateAndSpeciality(rateAndSpeciality) {
  rateTextHolder.innerHTML = rateAndSpeciality;
}

function setLogo(logoLink) {
  logoHolder.setAttribute("src", logoLink);
}

function formatDayOfHours(hour, day) {
    return `${day} : ${hour}`
}

function setHours(hours) {
  for (let i = 0; i < availableHoursHolders.length; i++) {
    availableHoursHolders[i].innerHTML = hours[i];
  }
}

function setLocation(location) {
    locationTextHolder.innerText = `  ${location}`;
}

function setWebSitelink(link) {
    websiteTextHolder.innerText = `Check Resturant At: ${link}`
}

