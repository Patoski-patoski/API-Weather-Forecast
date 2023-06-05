const main = document.querySelector('main');
const searchCity = document.getElementById('#searchCity');

const apiKey = "a6e755dd586961cb6abab58d3c3adb14";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&q=lagos&units=metric`;

const checkWeather = async () => {
  const requestWeather = await fetch(apiURL + `&appid=${apiKey}`);
  let weatherData = await requestWeather.json();

  document.getElementById("icon-img").src = `https://openweathermap.org/img/wn/${weatherData["weather"][0]["icon"]}@2x.png`;
  document.getElementById("temp").innerText = `${Math.round(weatherData["main"]["temp"])}\u2103`;
  document.getElementById("main-weather").innerText += `${weatherData["weather"][0]["main"]},`;
  document.getElementById("other-weather").innerText = `${weatherData["weather"][0]["description"]}`;
  document.getElementById("city").innerText = `${weatherData["name"]},`;
  document.getElementById("country").innerText = `${weatherData["sys"]["country"]}`;

  //dates

  let date = new Date();
  const nameOfMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  document.getElementById("month").innerText = nameOfMonth[date.getMonth()];
  document.getElementById("dayofmonth").innerText = date.getDate() + ', ';
  document.getElementById("year").innerText = date.getFullYear() + '. ';
  document.getElementById("time").innerText = `${date.getHours()}:${date.getMinutes()}`;

  //second card 

  // const canvas = document.querySelector("canvas");
  function draw(canva, text, value = 60) {
    const canvas = document.querySelector(canva);
    if (canvas.getContext) {

      const ctx = canvas.getContext("2d");
      // Set the canvas dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Set the circle properties
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;


      // Set the text properties
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff"

      // Calculate the text position
      const textX = centerX;
      const textY = centerY;

      // Draw the text at the center
      ctx.fillText(text, textX, textY);


      ctx.beginPath();
      ctx.lineWidth = "10";
      ctx.lineCap = "butt";
      ctx.strokeStyle = "#fff";
      ctx.arc(75, 75, 70, 0, (2 * Math.PI * value) / 100);
      ctx.stroke();

      // return text;
    }
    else
    {
      alert(`Your browser does not support <canvas> element`);
    }
  }

  draw(".circle1", Math.round(weatherData["main"]["humidity"]) + "%", weatherData["main"]["humidity"]);
  draw(".circle2", Math.round(weatherData["main"]["feels_like"]) + "%", weatherData["main"]["feels_like"]);
  draw(".circle3", Math.round(weatherData["clouds"]["all"]) + "%", weatherData["clouds"]["all"]);
  console.log(weatherData);
}

// setTimeout(() => checkWeather(), 3000);
checkWeather(); 