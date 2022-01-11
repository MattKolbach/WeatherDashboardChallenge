const apiKey = "842c3948b50987469451e4a23adc7e2e";
const citySearchButton = document.querySelector("#userCityButton");
const cityNameEl = document.querySelector("#userCityInput");
let citySearchHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
const cityHistoryColumnEl = document.querySelector("#cityHistory");
const currentCityweatherEl = document.getElementById("currentCityweather");
let today = new Date().toLocaleDateString();
let currentCityLat;
let currentCityLon;
const fiveDayEl = document.querySelector("#fiveDay");

////////////////////////////////////global variables above///////////////////////////////////////////////

//////////     first API call     //////////
const getCurrentWeatherHandler = function (event) {
  currentCityweatherEl.innerHTML = "";
  const cityName = cityNameEl.value.trim();
  //clear old content from input on screen
  cityNameEl.value = "";
  APIBuilder(cityName);
};

const APIBuilder = function(cityName){
  currentCityweatherEl.innerHTML = "";
  const currentWeatherApiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    apiKey;
  console.log("current weather api: " + currentWeatherApiUrl);
  fetch(currentWeatherApiUrl).then(function (response) {
    if (response.ok) {
      citySearchHandler(cityName);
      console.log(response);
      response.json().then(function (data) {
        console.log("current weather data: ");
        console.log(data);
        const currentCityName = document.createElement("h2"); //creating tag for current city
        const currentCityTemp = document.createElement("p");
        const currentCityHumidity = document.createElement("p");
        const currentCityWind = document.createElement("p");

        currentCityName.textContent = `${data.name}, ${today}`; //grab the name from the data
        currentCityTemp.textContent = `Temp: ${data.main.temp} °F`;
        currentCityHumidity.textContent = `Humidity: ${data.main.humidity} %`;
        currentCityWind.textContent = `Wind: ${data.wind.speed} MPH`;

        currentCityweatherEl.append(
          currentCityName,
          currentCityTemp,
          currentCityHumidity,
          currentCityWind
        );

        currentCityLat = data.coord.lat;
        currentCityLon = data.coord.lon;
        console.log(currentCityLon);
        console.log(currentCityLat);
        oneCallWeatherHandler();
      });
    }
  });
};


/////  second API call  /////
const oneCallWeatherHandler = function () {
  const oneCallApiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    currentCityLat +
    "&lon=" +
    currentCityLon +
    "&exclude=minutely,hourly&units=imperial&appid=" +
    apiKey;
  console.log("one call api:");
  console.log(oneCallApiUrl);
  fetch(oneCallApiUrl).then(function (response) {
    console.log("one call response: " + response);
    response.json().then(function (data) {
      console.log("one call data:");
      console.log(data);
      const currentCityUvi = document.createElement("p");

      currentCityUvi.textContent = `UVI: ${data.current.uvi}`;
      currentCityweatherEl.append(currentCityUvi);
      fiveDayElHandler(data.daily);
    });
  });
};

const fiveDayElHandler = function(fiveDayData) {
  fiveDayEl.innerHTML = ""
  for (let i=1; i<6; i++){
    let newDate = new Date(fiveDayData[i].dt*1000).toLocaleDateString("en-US")
    let newDiv = document.createElement("div");
    newDiv.classList.add("col-lg")
    let newEl = `<div class="card">
        <img src="http://openweathermap.org/img/wn/${fiveDayData[i].weather[0].icon}@2x.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${newDate}</h5>
          <p class="card-text">Temp: ${fiveDayData[i].temp.day} </p>
          <p class="card-text">Wind: ${fiveDayData[i].wind_speed}</p>
          <p class="card-text">Humidity: ${fiveDayData[i].humidity}</p>
        </div>
      </div>`
newDiv.innerHTML = newEl;
fiveDayEl.append(newDiv);
  }
};

////////this captures the city name when the search button is clicked////////
var citySearchHandler = function (cityName) {
  //pushing cityName to citySearchHistory array
  if (!citySearchHistory.includes(cityName)) {
    citySearchHistory.push(cityName); //pushes to citySearchHistory array
    console.log(citySearchHistory);
    cityButtonFactory(cityName);
  }

  saveCity(citySearchHistory); //pass citySearchHistory to the saveCity function
};


/////     saving city name to local storage    /////
let saveCity = function (cityHistory) {
  //cityHistory was citySearchHistory
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
  citySearchHistoryEl.addEventListener("click", () => APIBuilder(cityName));
};

/////     Load search history on page load     /////
const loadSearchHistory = function () {
  const loadCityHistory = localStorage.getItem("cityHistory");
  const parsedCityHistory = JSON.parse(loadCityHistory);
  console.log(parsedCityHistory);
  if (parsedCityHistory){
  parsedCityHistory.forEach(cityButtonFactory);
  }
};

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

//capture lat and longitude from first api
//feed lat and lon into second API call
//capture UV index from second API
//put UV index on page
//capture 5 of 7 days forcast from second API call
//put forcast on page

//capture clicking on historical city buttons to search

//fix bugs

//change input to form?

//finalize css/bootstrap
