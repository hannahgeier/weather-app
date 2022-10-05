let apiKey = "5da7b2dc058f07286fea39c4cee516a3";
let city = "London";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`

function displayTemperature (response) {

let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(response.data.main.temp);

let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;

let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;

let humidityElement = document.querySelector ("#humidity");
humidityElement.innerHTML = response.data.main.humidity;

let windElement = document.querySelector ("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);
}

axios.get (apiUrl). then(displayTemperature);