import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBIxCrMdhYAG7p_iLoNXIkcnBhD6n1Kqek',
  authDomain: 'motoapp-97373.firebaseapp.com',
  projectId: 'motoapp-97373',
  storageBucket: 'motoapp-97373.firebasestorage.app',
  messagingSenderId: '494648272586',
  appId: '1:494648272586:web:c82de3de42f4903f11b633',
  measurementId: 'G-3HYCVRGDNE'
};

try {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  auth.setPersistence('session');
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed:', error);
}