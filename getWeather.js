const http = require('http');
const https = require('https');
const apiKey = ; //would normal store in a separate JSON file but kept here for functionality

function printWeather(city, temp, currentConditions) {
  console.log(`In ${city} the temperature is ${temp}°F with ${currentConditions}`);
}
function convertKelvin (kelvin) {
  return Math.round((kelvin - 273.15) * (9/5) + 32);
}
function printError(error) {
  console.error(error.message);
}

function get(city) {
  try{
    const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}`, (res) => {
      if(res.statusCode === 200) {
        let body = "";
        res.on('data', (data) => {
          body += data.toString();
        });
        res.on('end', () => {
          let parsed = JSON.parse(body);
          let kelvin = parsed.main.temp;
          let temp = convertKelvin(kelvin);
          let currentConditions = parsed.weather[0].description;
          return printWeather(`${city}`, `${temp}`, `${currentConditions}`);
        });
      } else {
      const statusCodeError = new Error(`There was a problem getting the weather, sorry! (Error: ${http.STATUS_CODES[res.statusCode]})`);
      printError(statusCodeError);
      }
    });
    request.on('error', (error) => {
      printError(error);
    })
  } catch(error) {
  printError(error);
  }
};

module.exports.get = get; //make available to app.js
