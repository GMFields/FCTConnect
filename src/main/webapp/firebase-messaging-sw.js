importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp(firebaseConfig = {
    apiKey: "AIzaSyCdm6bC6PQfAi47Fo8g0FLEOI_gnBSyrpY",
    authDomain: "discipulosamd.firebaseapp.com",
    projectId: "discipulosamd",
    storageBucket: "discipulosamd.appspot.com",
    messagingSenderId: "642783337455",
    appId: "1:642783337455:web:d17d478d44eceb6a8ef41a",
    measurementId: "G-L1EFK4K3H2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const title = 'Hello World';
    const options = {
        body: payload.data.status,
        icon: '/firebase-logo.png'
    };
    return self.registration.showNotification(title, options)
});