'use strict';
const weather = require('./weather');
const dom = require('./dom');

const searchBtn = () => {
  $('#searchBtn').click((e) => {
    let searchText = $('#search-bar').val();
    let zip = searchText;
    weather.currentWeather(zip);
    console.log(zip);
  });
};

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      let searchText = $('#search-bar').val();
      let zip = searchText;
      weather.currentWeather(zip);
      console.log(zip);
    }
  });
};


module.exports = { searchBtn, pressEnter };