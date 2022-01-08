const apiKey = "842c3948b50987469451e4a23adc7e2e";
let cityName;
//let city = "milwaukee"; //for testing purposes only
const citySearchButton = document.querySelector("#userCityButton");
const cityNameEl = document.querySelector("#userCityInput");
let citySearchHistory = [];
const cityHistoryColumnEl = document.querySelector("#cityHistory");
////////////////////////////////////global variables above///////////////////////////////////////////////

////////this captures the city name when the search button is clicked////////
var citySearchHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  cityName = cityNameEl.value.trim();

  //clear old content from input on screen
  cityNameEl.value = "";

  //pushing cityName to citySearchHistory array
  citySearchHistory.push(cityName);
  console.log(citySearchHistory);

  saveCity();
  loadCity();

  ///create button for historical city///
  let citySearchHistoryEl = document.createElement("button");
  //add type
  citySearchHistoryEl.type = "button";
  //give it a class name
  citySearchHistoryEl.className = "btn btn-secondary";
  citySearchHistoryEl.innerText = cityName;
  cityHistoryColumnEl.appendChild(citySearchHistoryEl);
};

/////saving city name to local storage/////
let saveCity = function () {
  localStorage.setItem("cityHistory", JSON.stringify(cityName));
};

/////load saved cities name to page(history button)/////
let loadCity = function () {
  let loadedCityName = localStorage.getItem("cityHistory");
  console.log(loadedCityName);
};

let getCurrentWeather = function (cityName) {
  let currentWeatherApiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    apiKey;

  fetch(currentWeatherApiUrl).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
};

let testQueryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  "milwaukee" +
  "&units=imperial" +
  "&appid=" +
  apiKey;
console.log(testQueryURL);

//////////////////////////////////////////////////////////////////////////////////////////
// add event listeners
citySearchButton.addEventListener("click", citySearchHandler);

//////////////////////////////////////////////////////////////////////////////////////////
/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city*/

//capture city from input
///pass city into url
//save city to history "buttons"
//get data
//pick stuff out of array that I need
//plug data into cards
