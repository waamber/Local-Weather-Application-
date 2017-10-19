(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
const weather = require('./weather');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/apiKey.json').done((data) => {
      resolve(data.apiKeys.weather.apiKey);
    }).fail((error) => {
      reject(error);
    });
  });
};

const retrieveKeys = () => {
  apiKeys().then((results) => {
    weather.setKey(results);
  }).catch((error) => {
    console.log('error in key retrieval', error);
  });
};

module.exports = { retrieveKeys };
},{"./weather":5}],2:[function(require,module,exports){
'use strict';

const domString = (weatherArray) => {
  let domString = '';
  for (let i = 0; i < weatherArray.length; i++) {
    if (i % 3 === 0) {
      domString += `<div class="row">`;
    }
    domString += `<div class="col-sm-6 col-md-4">`;
    domString += `<div class='caption'>`;
    domString += `<h3>${weatherArray[i].name}</h3>`;
    domString += `<p>${weatherArray[i].temp}</p>`;
    domString += `<p>${weatherArray[i].air_pressure}</p>`;
    domString += `<p>${weatherArray[i].wind_speed}</p>`;
    domString += `<p>${weatherArray[i].condition}</p>`;
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
    if (i % 3 === 2 || i === weatherArray.length - 1) {
      domString += `</div>`;
    }
  }
  printToDom(domString);
};

const printToDom = (dom) => {
  $('#weather-container').append(dom);
};

const clearDom = () => {
  $('#weather-container').empty();
};

module.exports = { domString, clearDom };
},{}],3:[function(require,module,exports){
'use strict';
const weather = require('./weather');
const dom = require('./dom');

const searchBtn = () => {
  $('#searchBtn').click((e) => {
    let searchText = $('#search-bar').val();
    let zip = searchText;
    weather.currentWeather(zip);
    console.log(zip);
    $('#forecastBtn').removeClass('hidden');
  });
};

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      let searchText = $('#search-bar').val();
      let zip = searchText;
      weather.currentWeather(zip);
      console.log(zip);
      $('#forecastBtn').removeClass('hidden');
    }
  });
};

const fiveDayBtn = () => {
  $('#five').click((e) => {
    let searchText = $('#search-bar').val();
    let zip = searchText;
    weather.fiveDayForecast(zip);
    // console.log(zip);
    // console.log(e);
  });
};

const threeDayBtn = () => {
  // // $('#five').click((e) => {
  // //   let searchText = $('#search-bar').val();
  // //   let zip = searchText;
  // //   weather.fiveDayForecast(zip);
  // //   // console.log(zip);
  // //   // console.log(e);
  // });
};


module.exports = { searchBtn, pressEnter, fiveDayBtn, threeDayBtn };
},{"./dom":2,"./weather":5}],4:[function(require,module,exports){
'use strict';
const api = require('./apiKeys');
const events = require('./events');

// const weather = require('./weather');

events.searchBtn();
events.pressEnter();
api.retrieveKeys();
events.fiveDayBtn();

// $(document).click(() => {
//   weather.currentWeather(37206);
// });


},{"./apiKeys":1,"./events":3}],5:[function(require,module,exports){
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
},{"./dom":2}]},{},[4]);
