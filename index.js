"use strict"
const main = document.querySelector("main");
const searchBtn = document.querySelector(".search-btn");

searchCity.addEventListener("click", () => {
  main.style.display = "block";
  document.body.style.backgroundColor = "#fff"; 

})

const apiKey = "a6e755dd586961cb6abab58d3c3adb14";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&q=abuja&units=metric`;

async function checkWeather() {

  const requestWeather = await fetch(apiURL + `&appid=${apiKey}`);
  let weatherData = await requestWeather.json();

  const { clouds, coord, main, name, sys, visibility, weather, wind } = weatherData;

  document.getElementById("icon-img").src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  document.querySelector(".temp").innerText = `${Math.round(main.temp)}°C`;
  document.getElementById("main-weather").innerText = `${weather[0].main},`;
  document.getElementById("other-weather").innerText = weather[0].description;
  document.getElementById("city").innerText = name;
  document.getElementById("country").innerText = sys.country;
  document.querySelector(".pressure h4").innerText = main.pressure + "hPa";
  document.querySelector(".visibility h4").innerText = visibility + "m";

  //date and time

  let date = new Date();
  const nameOfMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  document.getElementById("month").innerText = nameOfMonth[date.getMonth()];
  document.getElementById("dayofmonth").innerText = date.getDate() + ', ';
  document.getElementById("year").innerText = date.getFullYear() + '. ';
  document.getElementById("time").innerText = `${date.getHours()}:${date.getMinutes()}`;


  //get sunrise and sunset

  function getSunRise(value) {
    const timestamp = value;
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const result = date.getHours() + ':' + date.getMinutes();
    return result;
  }

  document.querySelector(".sun-rise").innerText = getSunRise(sys["sunrise"]);
  document.querySelector(".sun-set").innerText = getSunRise(sys["sunset"]);

  //canvas humidity, clouds feels-like

  function draw(canva, text, value) {
    const canvas = document.querySelector(canva);
    canvas.addEventListener("mouseover", () => {
      canvas.style.transform = "rotate(360deg)";
    })
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      // Set the canvas dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Set the circle properties
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff"

      // set the text position
      const textX = centerX;
      const textY = centerY;

      // Draw the text at the center
      ctx.fillText(text, textX, textY);

      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.lineCap = "butt";
      ctx.strokeStyle = "#fff";
      ctx.arc(50, 50, 45, 0, (2 * Math.PI * value) / 100);
      ctx.stroke();

    }
    else {
      alert(`Your browser does not support <canvas> element`);
    }
  }

  draw(".circle1", Math.round(main.humidity) + "%", main.humidity);
  draw(".circle2", Math.round(main.feels_like) + "%", main.feels_like);
  draw(".circle3", Math.round(clouds.all) + "%", clouds.all);

  //wind
  document.querySelector(".wind-speed span").innerText = wind.speed;
  document.querySelector(".wind-degree span").innerText += wind.deg;

  //others
  document.querySelector(".longitude span").innerText = coord.lon;
  document.querySelector(".latitude span").innerText += coord.lat;
  document.querySelector(".min-temp span").innerText += main.temp_min + "°C";
  document.querySelector(".max-temp span").innerText += main.temp_max + "°C";

  console.log(weatherData);
}

checkWeather(); 
