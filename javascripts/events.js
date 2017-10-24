'use strict';
const weather = require('./weather');

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

module.exports = { searchBtn, pressEnter, fiveDayBtn, threeDayBtn };