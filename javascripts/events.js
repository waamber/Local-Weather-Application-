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
    $('#current').removeClass('hidden');
    $('.resetBtn').removeClass('hidden');
  });
};

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      let searchText = $('#search-bar').val();
      let zip = searchText;
      validate(zip);
      weather.currentWeather(zip);
      $('#forecastBtn').removeClass('hidden');
      $('#current').removeClass('hidden');
      $('.resetBtn').removeClass('hidden');
    }
  });
};

const fiveDayBtn = () => {
  $('#five').click((e) => {
    let searchText = $('#search-bar').val();
    let zip = searchText;
    validate(zip);
    weather.fiveDayForecast(zip);
    $('#forecastBtn').addClass('hidden');
    $('.resetBtn').removeClass('hidden');
  });
};

const threeDayBtn = () => {
  $('#three').click((e) => {
    let searchText = $('#search-bar').val();
    let zip = searchText;
    validate(zip);
    weather.threeDayForecast(zip);
    $('#forecastBtn').addClass('hidden');
    $('#reset').removeClass('hidden');
  });
};

const validate = (zip) => {
  if ($.isNumeric(zip) && zip.length === 5) {
  } else {
    window.alert('Please enter 5-digit zipcode');
  }
};

module.exports = { searchBtn, pressEnter, fiveDayBtn, threeDayBtn };