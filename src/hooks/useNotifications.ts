import { useState, useEffect, useCallback } from 'react';

const isNotificationAPISupported = () => typeof window !== 'undefined' && 'Notification' in window;

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (isNotificationAPISupported()) {
      setIsSupported(true);
      console.log("Browser notification permission is:", Notification.permission);
      setPermission(Notification.permission);
    } else {
      setIsSupported(false);
    }
  }, []);

  const requestPermission = useCallback(() => {
    if (!isSupported) return;
    Notification.requestPermission().then((result) => {
      setPermission(result);
    });
  }, [isSupported]);

  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (typeof window !== 'undefined' && 'Notification' in window && permission === 'granted') {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.showNotification(title, options);
        })
        .catch((err) => {
          console.error('Erro ao acessar service worker para notificação:', err);
        });
    }
  }, [permission]);

  return { permission, requestPermission, showNotification, isSupported };
};
