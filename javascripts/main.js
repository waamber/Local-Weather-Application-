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







