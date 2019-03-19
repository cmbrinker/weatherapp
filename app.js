const getWeather = require('./getWeather');
const argvQuery = process.argv.slice(2);

getWeather.get(argvQuery); //select city's weather with: node app.js city
