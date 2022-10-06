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
}

function search (city) {
    let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
    axios.get (apiUrl). then(displayTemperature);
}

function handleSubmit (event) {
event.preventDefault ();
let cityInputElement = document.querySelector ("#city-input");
search (cityInputElement.value);
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

function displayForecast() {
    let forecastElement = document.querySelector("#weather-forecast");
    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat","Sun", "Mon", "Tue"];
    days.forEach(function(day){
        forecastHTML =forecastHTML +
        `
        <div class="col-2">
            <div class="weather-forecast-date">Thu</div>
            <img src="http://openweathermap.org/img/wn/03n@2x.png" alt="" width="42">
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">18°</span>
                <span class="weather-forecast-temperature-min">12°</span>
            </div>
        </div>
        `;
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Sydney");
displayForecast();