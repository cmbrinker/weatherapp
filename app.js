const http = require('http');
const https = require('https');

let city = process.argv.slice(2);

function getWeather(city) {
  const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e29d833be8267adf323f05ed153a18be`, (res) => {
    let body = "";
    res.on('data', (data) => {
      body += data.toString();
    });
    res.on('end', () => {
      let currentConditions = JSON.parse(body);
      console.log(currentConditions.weather[0].description);
    });
  });
}

getWeather(city);
