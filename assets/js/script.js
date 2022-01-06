const apiKey = "842c3948b50987469451e4a23adc7e2e";
let cityName;
//let city = "milwaukee"; //for testing purposes only
const citySearchButton = document.querySelector("#userCityButton");
const cityNameEl = document.querySelector("#userCityInput");
////////////////////////////////////global variables above///////////////////////////////////////////////

////////this captures the city name when the search button is clicked////////
var citySearchHandler = function (event) {
  // prevent page from refreshing
  event.preventDefault();
  console.log("the button has been clicked");
  // get value from input element
  cityName = cityNameEl.value.trim();
  console.log("the city searched was " + cityName);
  //clear old content from input on screen
  cityNameEl.value = "";
};



let getCurrentWeather = function (cityName) {
  let currentWeatherApiUrl =
  "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial" + "&appid=" + apiKey;

  fetch(currentWeatherApiUrl).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
};


//capture city from input
///pass city into url
//get data
//pick stuff out of array that I need




let testQueryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" + "milwaukee" + "&units=imperial" + "&appid=" + apiKey;
console.log(testQueryURL);

//////////////////////////////////////////////////////////////////////////////////////////
// add event listeners to forms
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
