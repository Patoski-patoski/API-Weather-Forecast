const main = document.querySelector('main');
const searchCity = document.getElementById('#searchCity');

// const apiKey = "a6e755dd586961cb6abab58d3c3adb14";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&q=Berlin&units=metric`;

const checkWeather = async() => {
    const requestWeather = await fetch(apiURL+`&appid=${apiKey}`);
    let weatherData = await requestWeather.json();

    document.getElementById("icon-img").src = `https://openweathermap.org/img/wn/${weatherData["weather"][0]["icon"]}@2x.png`;
    document.querySelector(".temp h2").innerText = `${weatherData["main"]["temp"]}\u2103`
    document.getElementById("temp-description span").innerText = `${weatherData["weather"][0]["main"]}`

    console.log(weatherData);
}

// checkWeather();