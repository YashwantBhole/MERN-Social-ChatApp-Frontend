import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let messaging;
export function initFirebase() {
  if (messaging) return;
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);

  // show native notification for foreground payloads
  onMessage(messaging, async (payload) => {
    console.log('foreground message', payload);
    if (Notification.permission === 'granted') {
      const title = payload.notification?.title || 'New message';
      const options = { body: payload.notification?.body || '', data: payload.data || {} };
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg && reg.showNotification) reg.showNotification(title, options);
      else new Notification(title, options);
    }
  });
}

async function ensureSW() {
  if (!('serviceWorker' in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    await navigator.serviceWorker.ready;
    return reg;
  } catch (e) {
    console.warn('SW register failed', e && e.message);
    return null;
  }
}

export async function requestAndSaveToken(email, backendUrl) {
  if (!messaging) { console.warn('Call initFirebase() first'); return; }

  // Ask permission (minimal)
  if (Notification.permission !== 'granted') {
    const p = await Notification.requestPermission();
    if (p !== 'granted') console.warn('Notification permission:', p);
  }

  await ensureSW(); // SW must be registered from site root

  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
  try {
    const currentToken = await getToken(messaging, { vapidKey });
    if (currentToken) {
      await fetch(`${backendUrl}/api/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: currentToken })
      });
      console.log('FCM token saved on server');
      return currentToken;
    }
  } catch (err) {
    console.error('getToken error', err);
  }
}
