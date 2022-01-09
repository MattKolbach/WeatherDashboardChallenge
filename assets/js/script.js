const apiKey = "842c3948b50987469451e4a23adc7e2e";
const citySearchButton = document.querySelector("#userCityButton");
const cityNameEl = document.querySelector("#userCityInput");
let citySearchHistory = [];
const cityHistoryColumnEl = document.querySelector("#cityHistory");
const currentCityweatherEl = document.getElementById("currentCityweather");
let today = new Date().toLocaleDateString();

////////////////////////////////////global variables above///////////////////////////////////////////////

//////////     API call start     //////////
let getCurrentWeatherHandler = function (event) {
  const cityName = cityNameEl.value.trim();
  //clear old content from input on screen
  cityNameEl.value = "";
  
  let currentWeatherApiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  console.log(currentWeatherApiUrl);
  fetch(currentWeatherApiUrl).then(function (response) {
    if (response.ok) {
      citySearchHandler(cityName);
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        const currentCity = document.createElement("h2"); //creating tag for current city
        const currentCityTemp = document.createElement("p");
        const currentCityHumidity = document.createElement("p");
        const currentCityWind = document.createElement("p");
        //const currentCityUVIndex = document.createElement("p");

        currentCity.textContent = `${data.name}, ${today}`; //grab the name from the data
        currentCityTemp.textContent = `Temp: ${data.main.temp} °F`;
        currentCityHumidity.textContent = `Humidity: ${data.main.humidity} %`;
        currentCityWind.textContent = `Wind: ${data.wind.speed} MPH`;
        //currentCityUVIndex.textContent = `UV Index: `

        currentCityweatherEl.append(
          currentCity,
          currentCityTemp,
          currentCityHumidity,
          currentCityWind
        );
      });
    }
  });
};

////////this captures the city name when the search button is clicked////////
var citySearchHandler = function (cityName) {

  //pushing cityName to citySearchHistory array
  if (!citySearchHistory.includes(cityName)) {
    citySearchHistory.push(cityName); //pushes to citySearchHistory array
    console.log(citySearchHistory);
    cityButtonFactory(cityName);
  }

  saveCity(citySearchHistory);//pass citySerchHistory to the saveCity function
};

/////     saving city name to local storage    /////
let saveCity = function (cityHistory) {//cityHistory was citySearchHistory
  localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
};

/////    load saved cities name to page(history button)    /////
let loadCity = function () {
  let loadedCityName = localStorage.getItem("cityHistory");
};

/////     create button for historical city    /////
const cityButtonFactory = function (cityName) {
  let citySearchHistoryEl = document.createElement("button");
  //add type
  citySearchHistoryEl.type = "button";
  //give it a class name
  citySearchHistoryEl.className = "btn btn-secondary";
  //set text onto button created
  citySearchHistoryEl.innerText = cityName;
  cityHistoryColumnEl.appendChild(citySearchHistoryEl);
};


/////     Load search history on page load     /////
const loadSearchHistory = function () {
  const loadCityHistory = localStorage.getItem("cityHistory");
  const parsedCityHistory = JSON.parse(loadCityHistory);
  console.log(parsedCityHistory);
  parsedCityHistory.forEach(cityButtonFactory);
};

/*
let testQueryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  "milwaukee" +
  "&units=imperial" +
  "&appid=" +
  apiKey;
console.log(testQueryURL);
*/

//////////////////////////////////////////////////////////////////////////////////////////
// add event listeners
citySearchButton.addEventListener("click", getCurrentWeatherHandler);
window.onload = loadSearchHistory;

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
