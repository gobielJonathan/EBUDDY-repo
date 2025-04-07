// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { initializeApp as initializeAppAdmin } from 'firebase-admin/app';
import { getAuth as getAuthAdmin } from 'firebase-admin/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg72n64HC-5TmvgpH71SkxTUbFz1XE5qM",
  authDomain: "ebuddy-725aa.firebaseapp.com",
  projectId: "ebuddy-725aa",
  storageBucket: "ebuddy-725aa.firebasestorage.app",
  messagingSenderId: "939688435757",
  appId: "1:939688435757:web:ee0f6f208f703b374698a4",
  measurementId: "G-B6NX87PYYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const appAdmin = initializeAppAdmin(firebaseConfig)

export const authAdmin = getAuthAdmin(appAdmin);

export const db = getFirestore(app);

export const auth = getAuth(app);

export default app