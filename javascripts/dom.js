'use strict';

const domString = (weatherArray, icons) => {
  let domString = '';
  for (let i = 0; i < weatherArray.length; i++) {
    if (i % 3 === 0) {
      domString += `<div class="row">`;
    }
    domString += `<div class="col-md-4 weather-card">`;
    if (weatherArray[i].name) {
      domString += `<h1>${weatherArray[i].name}</h1>`;
    } else {
      domString += `<h2>${weatherArray[i].date}</h2>`;

    }
    domString += `<div class="icon"><img src="${icons[weatherArray[i].condition]}">`;
    domString += `</div>`;
    domString += `<h4>Temp: ${weatherArray[i].temp}&deg;F</h4>`;
    domString += `<p>Air Pressure: ${weatherArray[i].air_pressure}hPa</p>`;
    domString += `<p>Wind Speed: ${weatherArray[i].wind_speed}mph</p>`;
    domString += `<p>Condition: ${weatherArray[i].condition}</p>`;
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