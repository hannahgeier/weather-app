function formatDate (timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
        }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days [date.getDay()];
    return `${day}, ${hours}:${minutes}`
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function getForecast(coordinates) {
    let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl) .then(displayForecast);
}

function displayTemperature (response) {

celsiusTemperature = response.data.main.temp;

let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);

let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;

let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;

let humidityElement = document.querySelector ("#humidity");
humidityElement.innerHTML = response.data.main.humidity;

let windElement = document.querySelector ("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);

let dateElement = document.querySelector ("#date");
dateElement.innerHTML = formatDate(response.data.dt * 1000);

let iconElement = document.querySelector ("#icon");
iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response.data.coord);
}

function searchCity (city) {
    let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
    axios.get(apiUrl). then(displayTemperature);
}

function searchLocation (position) {
    let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${unit}&appid=${apiKey}`;
    
    axios.get(apiUrl). then(displayTemperature);
}

function handleSubmit (event) {
event.preventDefault ();
let cityInputElement = document.querySelector ("#city-input");
searchCity (cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index){
        if (index < 6){
        forecastHTML =forecastHTML +
        `
        <div class="col-2">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42">
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}??C</span>
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}??C</span>
            </div>
        </div>
        `;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getCurrentPosition (event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#location-button");
button.addEventListener("click", getCurrentPosition);

searchCity("Sydney");
