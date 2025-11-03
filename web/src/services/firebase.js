import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FIREBASE_CONFIG } from '../config';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth(app);

export { app, auth };
