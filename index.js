const main = document.querySelector('main');
const searchCity = document.getElementById('#searchCity');
const degCelsius = document.querySelector("sup").innerText;

// const apiKey = "a6e755dd586961cb6abab58d3c3adb14";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&q=islamabad&units=metric`;

const checkWeather = async () => {
    const requestWeather = await fetch(apiURL + `&appid=${apiKey}`);
    let weatherData = await requestWeather.json();


    document.getElementById("icon-img").src = `https://openweathermap.org/img/wn/${weatherData["weather"][0]["icon"]}@2x.png `;
    document.querySelector(".main-card h2").innerText = `${parseFloat(weatherData["main"]["temp"]) + ` ` + degCelsius}`;
    let description = document.getElementById("#other-description");
    description.innerText = `${weatherData["weather"][0]["description"]}`;
    document.getElementById("temp-description").innerText = `${weatherData["weather"][0]["main"]},${description}`; get

    console.log(weatherData);
}

checkWeather();