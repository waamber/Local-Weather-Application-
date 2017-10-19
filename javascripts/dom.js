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