const main = document.querySelector('main');
const searchCity = document.getElementById('#searchCity');

// const apiKey = "a6e755dd586961cb6abab58d3c3adb141"
const apiURL = `https://api.openweathermap.org/data/2.5/weather?&q=Berlin&units=metric`;


const checkWeather = async () => {
    const request = await fetch(apiURL + `&appid=${apiKey}&`);
    const data = await request.json();
    if(!data) {
        console.log(`Error`);
    }

    console.log(data);
}

checkWeather().then((data) => {
    data;
}).catch((err) => {
    console.log(`Unauthorized api Key: ${err.message}`); 
}); 

