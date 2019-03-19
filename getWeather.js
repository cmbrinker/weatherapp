const http = require('http');
const https = require('https');
const apiKey = `e29d833be8267adf323f05ed153a18be`;

function printWeather(city, temp, currentConditions) {
  console.log(`In ${city} the temperature is ${temp}°F with ${currentConditions}`);
}

function convertKelvin (kelvin) {
  return (kelvin - 273.15) * (9/5) + 32;
}

function get(city) {
  const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`, (res) => {
    if(res.statusCode === 200) {
      let body = "";
      res.on('data', (data) => {
        body += data.toString();
      });
      res.on('end', () => {
        let parsed = JSON.parse(body);
        let kelvin = parsed.main.temp;
        let temp = Math.round(convertKelvin(kelvin));
        let currentConditions = parsed.weather[0].description;
        return printWeather(`${city}`, `${temp}`, `${currentConditions}`);
      });
    } else {
    console.error(`There was a problem getting the weather, sorry! (Error: ${http.STATUS_CODES[res.statusCode]})`);
    }
  });
}

module.exports.get = get;