'use strict';
const api = require('./apiKeys');
const events = require('./events');
const weather = require('./weather');

$(document).ready(function () {
  events.searchBtn();
  events.pressEnter();
  api.retrieveKeys();
  events.fiveDayBtn();
  events.threeDayBtn();
  weather.icons();
});







