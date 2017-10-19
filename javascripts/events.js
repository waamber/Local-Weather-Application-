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