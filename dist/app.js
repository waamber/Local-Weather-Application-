(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
const weather = require('./weather');
const firebaseApi = require('./firebaseApi');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/apiKey.json').done((data) => {
      resolve(data.apiKeys);
    }).fail((error) => {
      reject(error);
    });
  });
};

const retrieveKeys = () => {
  apiKeys().then((results) => {
    weather.setKey(results.weather.apiKey);
    firebaseApi.setKey(results.firebaseKeys);
    firebase.initializeApp(results.firebaseKeys);
  }).catch((error) => {
    console.log('error in key retrieval', error);
  });
};

module.exports = { retrieveKeys };
},{"./firebaseApi":4,"./weather":6}],2:[function(require,module,exports){
'use strict';

const domString = (weatherArray, icons) => {
  let domString = '';
  for (let i = 0; i < weatherArray.length; i++) {
    domString += `<div class="weather-card">`;
    if (weatherArray[i].name) {
      domString += `<h1 class="name">${weatherArray[i].name}</h1>`;
    } else {
      domString += `<div class="date"><h2>${weatherArray[i].date}</h2>`;
      domString += `</div>`;
    }
    domString += `<div class="icon">`;
    domString += `<img class="weather-icon"src="${icons[weatherArray[i].condition]}">`;
    domString += `</div>`;
    domString += `<h2>${weatherArray[i].temp}&deg;F</h2>`;
    domString += `<p>Air Pressure: ${weatherArray[i].air_pressure} hPa</p>`;
    domString += `<p>Wind Speed: ${weatherArray[i].wind_speed} mph</p>`;
    domString += `<p>Condition: ${weatherArray[i].condition}</p>`;
    domString += `</div>`;
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
const firebaseApi = require('./firebaseApi');

const searchBtn = () => {
  $('#searchBtn').click((e) => {
    let searchText = $('#search-bar').val();
    let zip = searchText;
    weather.currentWeather(zip);
    $('#forecastBtn').removeClass('hidden');
    $('#current').removeClass('hidden');
  });
};

const fiveDayBtn = () => {
  $('#five').click((e) => {
    let searchText = $('#search-bar').val();
    let zip = searchText;
    validate(zip);
    weather.fiveDayForecast(zip);
    $('#forecastBtn').addClass('hidden');
  });
};

const threeDayBtn = () => {
  $('#three').click((e) => {
    let searchText = $('#search-bar').val();
    let zip = searchText;
    validate(zip);
    weather.threeDayForecast(zip);
    $('#forecastBtn').addClass('hidden');
  });
};

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let searchText = $('#search-bar').val();
      let zip = searchText;
      validate(zip);
      weather.currentWeather(zip);
      $('#forecastBtn').removeClass('hidden');
    }
  });
};

const validate = (zip) => {
  if ($.isNumeric(zip) && zip.length === 5) {
  } else {
    window.alert('Please enter 5-digit zipcode');
  }
};

const myLinks = () => {
  $(document).click((e) => {
    if (e.target.id === 'myWeather') {
      $('#savedWeather').removeClass('hidden');
      $('#authScreen').addClass('hidden');
      // getMyMovies();
    } else if (e.target.id === 'auth') {
      $('#savedWeather').addClass('hidden');
      $('#authScreen').removeClass('hidden');
    }
  });
};

const googleAuth = () => {
  $('#googleBtn').click(() => {
    firebaseApi.authenticateGoogle().then((result) => {
    }).catch((error) => {
      console.log('error in authentication', error);
    });
  });
};

module.exports = { searchBtn, pressEnter, fiveDayBtn, threeDayBtn, myLinks, googleAuth };
},{"./firebaseApi":4,"./weather":6}],4:[function(require,module,exports){
'use strict';
let userUid = '';
let firebaseKey = '';

const setKey = (key) => {
  firebaseKey = key;
};

let authenticateGoogle = () => {
  return new Promise((resolve, reject) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
      .then((authData) => {
        userUid = authData.user.uid;
        resolve(authData.user);
      }).catch((error) => {
        reject(error);
      });
  });
};

const getWeatherList = () => {
  let weather = [];
  return new Promise((resolve, reject) => {
    $.ajax(`${firebaseKey.databaseURL}/weather.json?orderBy="uid"&equalTo="${userUid}"`).then((fbWeather) => {
      if (fbWeather != null) {
        Object.keys(fbWeather).forEach((key) => {
          fbWeather[key].id = key;
          weather.push(fbWeather[key]);
        });
      }
      resolve(weather);
    }).catch((error) => {
      reject(error);
    });
  });
};

const saveWeather = (weather) => {
  weather.uid = userUid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseKey.databaseURL}/weather.json`,
      data: JSON.stringify(weather)
    }).then((result) => {
      resolve(result);
    }).catch((error) => {
      console.log('saveMove promise error', error);
    });
  });
};

module.exports = { setKey, authenticateGoogle, getWeatherList, saveWeather };
},{}],5:[function(require,module,exports){
'use strict';
const api = require('./apiKeys');
const events = require('./events');
const weather = require('./weather');

$(document).ready(function () {
  events.searchBtn();
  api.retrieveKeys();
  events.myLinks();
  events.googleAuth();
  events.fiveDayBtn();
  events.threeDayBtn();
  weather.icons();
  events.pressEnter();
});








},{"./apiKeys":1,"./events":3,"./weather":6}],6:[function(require,module,exports){
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
        temp: Math.round(data.main.temp),
        air_pressure: Math.round(data.main.pressure),
        wind_speed: Math.round(data.wind.speed),
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
      resolve(data.list);
      let forecast = data.list;
      for (let i = 3; i < forecast.length; i += 8) {
        let weather = {
          date: convertTime(forecast[i].dt),
          temp: Math.round(forecast[i].main.temp),
          air_pressure: Math.round(forecast[i].main.pressure),
          wind_speed: Math.round(forecast[i].wind.speed),
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
      for (let i = 2; i < 26; i += 8) {
        let weather = {
          temp: Math.round(forecast[i].main.temp),
          air_pressure: Math.round(forecast[i].main.pressure),
          wind_speed: Math.round(forecast[i].wind.speed),
          condition: forecast[i].weather[0].main,
          date: convertTime(forecast[i].dt)
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

const convertTime = (timestamp) => {
  let a = new Date(timestamp * 1000);
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = months[a.getMonth()];
  let date = a.getDate();
  let time = date + ' ' + month;
  return time;
};

module.exports = { setKey, currentWeather, fiveDayForecast, threeDayForecast, icons };
},{"./dom":2}]},{},[5]);
