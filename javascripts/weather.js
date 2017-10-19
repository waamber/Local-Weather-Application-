'use strict';
const dom = require('./dom');
let weatherKey;
let current = [];


const currentWeather = (zip) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${weatherKey}&units=imperial`
    ).done((data) => {
      resolve(data.main.temp, data.main.pressure, data.name, data.wind.speed, data.weather[0].main);
      let weather = {
        name: data.name,
        temp: data.main.temp,
        air_pressure: data.main.pressure,
        wind_speed: data.wind.speed,
        condition: data.weather[0].main
      };
      current.push(weather);
      console.log('weather object', current);
      showResults(current);
    }).fail((error) => {
      reject(error);
    });
  });
};

const setKey = (key) => {
  weatherKey = key;
};

const showResults = (weatherArray) => {
  dom.clearDom();
  dom.domString(weatherArray);
};

module.exports = { setKey, currentWeather };