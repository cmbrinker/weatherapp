const getWeather = require('./getWeather');
const argvQuery = process.argv.slice(2);

getWeather.get(argvQuery);
