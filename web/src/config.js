// These MUST be defined in .env.development or .env.production
const API_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// Firebase configuration
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBUm2vU-bPYSpsxIdd7pYerZx81GNgVJgQ",
  authDomain: "in-between-live.firebaseapp.com",
  projectId: "in-between-live",
  storageBucket: "in-between-live.firebasestorage.app",
  messagingSenderId: "800669475084",
  appId: "1:800669475084:web:89e0bbd44313d8bd3d2929",
  measurementId: "G-1PZPC7KWZF"
};

export {
  API_URL,
  SOCKET_URL,
  FIREBASE_CONFIG
};
