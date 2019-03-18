const http = require('http');
const https = require('https');


const request = https.get('https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=e29d833be8267adf323f05ed153a18be', (res) => {
  let body = "";
  res.on('data', (data) => {
    body += data.toString();
  });
  res.on('end', () => {
    let bodyParsed = JSON.parse(body);
    console.log(bodyParsed);
  })
})
