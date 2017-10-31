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
    $('#authScreen').addClass('hidden');
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
      $('#authScreen').addClass('hidden');
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
      $('#weather-container').addClass('hidden');
      $('#forecastBtn').addClass('hidden');
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

// const deleteWeather = () => {
//   $('body').on('click', '.delete', (e) => {
//     let weatherId = $(e.target).data('firebase-id');
//     firebaseApi.deleteWeather(weatherId).then((results) => {
//       // getMyMovies();
//     }).catch((error) => {
//       console.log(error);
//     });
//   });
// };


module.exports = { searchBtn, pressEnter, fiveDayBtn, threeDayBtn, myLinks, googleAuth };