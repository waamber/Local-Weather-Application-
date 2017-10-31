'use strict';
let userUid = '';
let firebaseKey = '';

const setKey = (key) => {
  firebaseKey = key;
};

let authenticateGoogle = () => {
  return new Promise((resolve, reject) => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
      .then((authData) => {
        userUid = authData.user.uid;
        resolve(authData.user);
      }).catch((error) => {
        reject(error);
      });
  });
};

const getWeatherList = () => {
  let weather = [];
  return new Promise((resolve, reject) => {
    $.ajax(`${firebaseKey.databaseURL}/weather.json?orderBy="uid"&equalTo="${userUid}"`).then((fbWeather) => {
      if (fbWeather != null) {
        Object.keys(fbWeather).forEach((key) => {
          fbWeather[key].id = key;
          weather.push(fbWeather[key]);
        });
      }
      resolve(weather);
    }).catch((error) => {
      reject(error);
    });
  });
};

const saveWeather = (weather) => {
  weather.uid = userUid;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseKey.databaseURL}/weather.json`,
      data: JSON.stringify(weather)
    }).then((result) => {
      resolve(result);
    }).catch((error) => {
      console.log('saveMove promise error', error);
    });
  });
};

const deleteWeather = (weatherId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "DELETE",
      url: `${firebaseKey.databaseURL}/weather/${weatherId}.json`
    }).then((fbWeather) => {
      resolve(fbWeather);
    }).catch((error) => {
      reject(error);
    });
  });
};

module.exports = { setKey, authenticateGoogle, getWeatherList, saveWeather, deleteWeather };