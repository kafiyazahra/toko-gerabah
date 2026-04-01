// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ TAMBAHAN

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwuih3Sw1Zd45fM0fUpz4IQcrcxNsEePw",
  authDomain: "toko-gerabah.firebaseapp.com",
  projectId: "toko-gerabah",
  storageBucket: "toko-gerabah.firebasestorage.app",
  messagingSenderId: "637466000266",
  appId: "1:637466000266:web:420a2a87d423753acda673",
  measurementId: "G-MR63TCM4M1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ TAMBAHAN
export const auth = getAuth(app);