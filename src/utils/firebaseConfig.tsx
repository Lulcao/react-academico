// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7NenjAdXXgGgucM0-4btnf7KLuRDUUwQ",
  authDomain: "controlepres-ff0e6.firebaseapp.com",
  databaseURL: "https://controlepres-ff0e6-default-rtdb.firebaseio.com",
  projectId: "controlepres-ff0e6",
  storageBucket: "controlepres-ff0e6.firebasestorage.app",
  messagingSenderId: "189898767549",
  appId: "1:189898767549:web:75e10590326a5fa8980bd4",
  measurementId: "G-6W6PEZJB90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const analytics = getAnalytics(app);