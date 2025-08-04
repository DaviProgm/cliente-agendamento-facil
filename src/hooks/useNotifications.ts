import { useState, useEffect, useCallback } from 'react';

// A utility to check for Notification API support
const isNotificationAPISupported = () => typeof window !== 'undefined' && 'Notification' in window;

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (isNotificationAPISupported()) {
      setIsSupported(true);
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
    if (isSupported && permission === 'granted') {
      new Notification(title, options);
    }
  }, [isSupported, permission]);

  return { permission, requestPermission, showNotification, isSupported };
};