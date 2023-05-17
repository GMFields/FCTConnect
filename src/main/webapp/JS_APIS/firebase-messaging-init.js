// Import the functions you need from the SDKs you need
import { initializeApp } from "../node_modules/@firebase/app";
import { getAnalytics } from "../node_modules/@firebase/analytics";
import { getMessaging, onMessage } from "../node_modules/@firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdm6bC6PQfAi47Fo8g0FLEOI_gnBSyrpY",
  authDomain: "discipulosamd.firebaseapp.com",
  projectId: "discipulosamd",
  storageBucket: "discipulosamd.appspot.com",
  messagingSenderId: "642783337455",
  appId: "1:642783337455:web:d17d478d44eceb6a8ef41a",
  measurementId: "G-L1EFK4K3H2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const messaging = getMessaging(app);

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      getToken(messaging, { vapidKey: 'BMDwkCrKQflcfiTD2U1mxLTjv-nfFmqxG6iTxMB8K1XweOhuB5X_TWLgOlGcndQ8neiupmJj9MPGxFRO3NxxIsI' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('currentToken: ', currentToken)
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
    } else {
      console.log("Do not have permissions!")
    }
  })
}

requestPermission();

onMessage(function(payload){
  console.log('on Message ', payload)
});

