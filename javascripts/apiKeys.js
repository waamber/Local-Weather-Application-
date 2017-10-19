'use strict';
const weather = require('./weather');

const apiKeys = () => {
  return new Promise((resolve, reject) => {
    $.ajax('./db/apiKey.json').done((data) => {
      resolve(data.apiKeys.weather.apiKey);
    }).fail((error) => {
      reject(error);
    });
  });
};

const retrieveKeys = () => {
  apiKeys().then((results) => {
    weather.setKey(results);
  }).catch((error) => {
    console.log('error in key retrieval', error);
  });
};

module.exports = { retrieveKeys };