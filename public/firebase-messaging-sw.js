// public/firebase-messaging-sw.js

// ATENÇÃO: As chaves do Firebase foram atualizadas para a versão 12.0.0
// e os valores foram substituídos por placeholders. 
// Você PRECISA substituir os valores abaixo pelas suas chaves de API corretas.

importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.0.0/firebase-messaging-compat.js");

// TODO: Substitua os valores abaixo pelas suas chaves do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCiVNjAm654VESAvglmZUR-ZHHb72LHSqQ",
  authDomain: "cloktrix.firebaseapp.com",
  projectId: "cloktrix",
  storageBucket: "cloktrix.appspot.com",
  messagingSenderId: "744344387840",
  appId: "1:744344387840:web:a4749ce18ad10490a073e5",
  measurementId: "G-SGW0TQKSYH"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("🔕 [firebase-messaging-sw.js] Background message received:", payload);

  const notificationTitle = payload?.notification?.title || "Notificação";
  const notificationOptions = {
    body: payload?.notification?.body,
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
