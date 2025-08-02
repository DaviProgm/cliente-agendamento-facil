// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCiVNjAm654VESAvglmZUR-ZHHb72LHSqQ",
  authDomain: "cloktrix.firebaseapp.com",
  projectId: "cloktrix",
  storageBucket: "cloktrix.firebasestorage.app",
  messagingSenderId: "744344387840",
  appId: "1:744344387840:web:a4749ce18ad10490a073e5",
  measurementId: "G-SGW0TQKSYH"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("🔕 [firebase-messaging-sw.js] Background message received:", payload);

  const notificationTitle = payload?.notification?.title || "Notificação";
  const notificationOptions = {
    body: payload?.notification?.body,
    icon: "/logo.png", // coloque um ícone no public se quiser
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
