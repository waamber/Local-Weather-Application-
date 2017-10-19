'use strict';
const api = require('./apiKeys');
const events = require('./events');

// const weather = require('./weather');

events.searchBtn();
events.pressEnter();
api.retrieveKeys();

// $(document).click(() => {
//   weather.currentWeather(37206);
// });

