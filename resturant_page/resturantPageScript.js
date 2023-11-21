/*
 *
 */
let searchUrl = new URLSearchParams(window.location.search);
let selectedItemId = searchUrl.get('id');
let titleTextHolder = document.querySelector("header h1");
let rateTextHolder = document.querySelector("header h3 span");
let logoHolder = document.querySelector("header img");
let availableHoursHolders = document.querySelectorAll(
  "main #hours-section > div > div span"
);
let locationTextHolder = document.querySelector("#location-section i");
let websiteTextHolder = document.querySelector('footer > div .links h3:first-child');

let request = new XMLHttpRequest();
request.open("GET", "/data/resturants_data.json");

request.onload = function () {
  let response = JSON.parse(request.response);
  let selectedItem = getRestoById(response);
  setTitleName(selectedItem.name);
  setRateAndSpeciality(
    ` ${selectedItem.note} | ${selectedItem.specialty} | ${selectedItem.phone}`
  );
  setLogo(selectedItem.logo);
  let hoursProperties = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'sturday', 'sunday'];
  setHours(selectedItem, hoursProperties, document.querySelectorAll('#hours-section span'));
  setLocation(selectedItem.address);
  setWebSitelink(selectedItem.website);
};
request.send();

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


function setHours(selectedItem, hoursProperties, textHolders) {
  for (let i = 0; i < hoursProperties.length; i++) {
    textHolders[i].innerText = `${hoursProperties[i].formate()} : ${selectedItem.hours[hoursProperties[i]]}`;
  }
}

window.String.prototype.formate = function (){
  return `${this[0].toUpperCase()}${this.slice(1, -1)}y`
}

function setLocation(location) {
    locationTextHolder.innerText = `  ${location}`;
}

function setWebSitelink(link) {
    websiteTextHolder.innerText = `Check Resturant At: ${link}`
}

