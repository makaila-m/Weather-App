function displayCurrentDayTime() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentDay = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return `${days[currentDay]}\n${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h2 = document.querySelector("h2");

  h2.innerHTML = `${searchInput.value}`;
}

function convertToF() {
  document.getElementById("degrees").innerHTML = "62°F";
}

function convertToC() {
  document.getElementById("degrees").innerHTML = "17°C";
}

function displayWeatherCondition(response) {
  document.querySelector("#search-text-input").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
}

function searchCity(city) {
  let apiKey = "c4c7b3218f1027cd9f34b30e34fb4659";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c4c7b3218f1027cd9f34b30e34fb4659";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let currentDayTime = document.getElementById("date-time");
currentDayTime.innerHTML = displayCurrentDayTime();

document.getElementById("fButton").onclick = function () {
  convertToF();
};
document.getElementById("cButton").onclick = function () {
  convertToC();
};

searchCity("New York");
