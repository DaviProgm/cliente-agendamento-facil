import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCiVNjAm654VESAvglmZUR-ZHHb72LHSqQ",
  authDomain: "cloktrix.firebaseapp.com",
  projectId: "cloktrix",
  storageBucket: "cloktrix.firebasestorage.app",
  messagingSenderId: "744344387840",
  appId: "1:744344387840:web:a4749ce18ad10490a073e5",
  measurementId: "G-SGW0TQKSYH",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
  console.log("🔄 Tentando obter o token do FCM...");

  if (!("serviceWorker" in navigator)) {
    console.error("❌ Service Workers não suportados neste navegador.");
    return;
  }

  try {
    // Registra o SW explicitamente
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("✅ Service worker registrado.");

    // Aguarda ele estar realmente pronto
    const readyRegistration = await navigator.serviceWorker.ready;
    console.log("✅ Service Worker pronto. Tentando recuperar token...");

    const currentToken = await getToken(messaging, {
      vapidKey: "BHsKE-EA8ZWChk1oAoucj9tgVSiQMUMquz79XynADRaHX0dsn2zOSwgzIkHbPyKA30G5AQ6bQQHmYX0Qds2BOB4",
      serviceWorkerRegistration: readyRegistration,
    });

    if (currentToken) {
      console.log("✅ Token FCM obtido com sucesso:", currentToken);
    } else {
      console.warn("⚠️ Nenhum token disponível. Verifique permissões.");
    }
  } catch (err) {
    console.error("❌ Erro ao recuperar token:", err);
    console.error("💡 Verifique se a chave VAPID está correta e se o service worker está no diretório /public.");
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Mensagem recebida em foreground:", payload);
      resolve(payload);
    });
  });
