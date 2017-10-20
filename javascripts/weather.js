'use strict';
const dom = require('./dom');
let weatherKey;
let current = [];
let fiveForecast = [];
let threeForecast = [];
let weatherIcons = {};

const currentWeather = (zip) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&APPID=${weatherKey}&units=imperial`
    ).done((data) => {
      resolve(data);
      let weather = {
        name: data.name,
        temp: data.main.temp,
        air_pressure: data.main.pressure,
        wind_speed: data.wind.speed,
        condition: data.weather[0].main,
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
      console.log('data', data);
      resolve(data.list);
      let forecast = data.list;
      for (var i = 2; i < forecast.length; i += 8) {
        let weather = {
          date: forecast[i].dt_txt,
          temp: forecast[i].main.temp,
          air_pressure: forecast[i].main.pressure,
          wind_speed: forecast[i].wind.speed,
          condition: forecast[i].weather[0].main,
        };
        fiveForecast.push(weather);
      }
      appendResults(fiveForecast);
    }).fail((error) => {
      reject(error);
    });
  });
};

const threeDayForecast = (zip) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&APPID=${weatherKey}&units=imperial`
    ).done((data) => {
      resolve(data.list);
      let forecast = data.list;
      for (var i = 2; i < 26; i += 8) {
        let weather = {
          temp: forecast[i].main.temp,
          air_pressure: forecast[i].main.pressure,
          wind_speed: forecast[i].wind.speed,
          condition: forecast[i].weather[0].main,
          date: forecast[i].dt_txt
        };
        threeForecast.push(weather);
      }
      appendResults(threeForecast);
    }).fail((error) => {
      reject(error);
    });
  });
};

const icons = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/icons.json').done((data) => {
      resolve(data);
      weatherIcons = data.icons;
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
  dom.domString(weatherArray, weatherIcons);
};

const appendResults = (weatherArray) => {
  dom.domString(weatherArray, weatherIcons);
};

module.exports = { setKey, currentWeather, fiveDayForecast, threeDayForecast, icons };