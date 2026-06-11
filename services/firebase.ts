import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  initializeAuth, 
  signInAnonymously as fbSignInAnonymously,
  signInWithEmailAndPassword as fbSignInWithEmail,
  createUserWithEmailAndPassword as fbSignUpWithEmail,
  Auth
} from 'firebase/auth';
// @ts-ignore
import { getReactNativePersistence } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with AsyncStorage persistence to prevent losing session on reload
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  const { getAuth } = require('firebase/auth');
  auth = getAuth(app);
}

const firestore: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// Helper authentication functions
export async function signInAnonymously() {
  try {
    const userCredential = await fbSignInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error('Firebase anonymous sign in failed:', error);
    throw error;
  }
}

export async function signInWithEmail(email: string, pass: string) {
  try {
    const userCredential = await fbSignInWithEmail(auth, email, pass);
    return userCredential.user;
  } catch (error) {
    console.error('Firebase email sign in failed:', error);
    throw error;
  }
}

export async function signUpWithEmail(email: string, pass: string) {
  try {
    const userCredential = await fbSignUpWithEmail(auth, email, pass);
    return userCredential.user;
  } catch (error) {
    console.error('Firebase email sign up failed:', error);
    throw error;
  }
}

export { app, auth, firestore, storage };
