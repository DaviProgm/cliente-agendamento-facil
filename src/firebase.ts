// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCiVNjAm654VESAvglmZUR-ZHHb72LHSqQ",
  authDomain: "cloktrix.firebaseapp.com",
  projectId: "cloktrix",
  storageBucket: "cloktrix.appspot.com",
  messagingSenderId: "744344387840",
  appId: "1:744344387840:web:a4749ce18ad10490a073e5",
  measurementId: "G-SGW0TQKSYH",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 👉 Esta função você irá usar no componente para pedir o token FCM
export const requestForToken = async (): Promise<string | null> => {
  console.log("🔄 Tentando obter o token do FCM...");

  if (!("serviceWorker" in navigator)) {
    console.error("❌ Service Workers não suportados neste navegador.");
    return null;
  }


  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("✅ Service worker registrado.");

    const readyRegistration = await navigator.serviceWorker.ready;
    console.log("✅ Service Worker pronto. Tentando recuperar token...");
    console.log("📡 Chamando getToken...");

    const currentToken = await getToken(messaging, {
      vapidKey: "BHsKE-EA8ZWChk1oAoucj9tgVSiQMUMquz79XynADRaHX0dsn2zOSwgzIkHbPyKA30G5AQ6bQQHmYX0Qds2BOB4",
      serviceWorkerRegistration: readyRegistration,
    });
    console.log("📦 Token FCM:", currentToken);

    if (currentToken) {
      console.log("✅ Token FCM obtido com sucesso:", currentToken);
      return currentToken;
    } else {
      console.warn("⚠️ Nenhum token disponível. Verifique permissões.");
      return null;
    }
  } catch (err) {
    console.error("❌ Erro ao recuperar token:", err);
    return null;
  }
};

// 👉 Listener para mensagens recebidas com a aba aberta
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Mensagem recebida em foreground:", payload);
      resolve(payload);
    });
  });
