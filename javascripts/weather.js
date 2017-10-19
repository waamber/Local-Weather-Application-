'use strict';
const dom = require('./dom');
let weatherKey;
let current = [];
let fiveForecast = [];


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
      showResults(current);
    }).fail((error) => {
      reject(error);
    });
  });
};

const fiveDayForecast = (zip) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${weatherKey}&units=imperial`
    ).done((data) => {
      resolve(data.list);
      let forecast = data.list;
      for (var i = 0; i < forecast.length; i++) {
        if (i % 7 === 0 && i > 0) {
          console.log('future 5', forecast[i].dt_txt);
        }
      }
      console.log('5 day', data.list);
      // showResults(current);
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

module.exports = { setKey, currentWeather, fiveDayForecast };