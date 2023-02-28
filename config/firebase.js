// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1tA5p6_XK06vJ5CjfvMNQ5xFFofyHPNg",
  authDomain: "emotion-ba188.firebaseapp.com",
  databaseURL: "https://emotion-ba188-default-rtdb.firebaseio.com",
  projectId: "emotion-ba188",
  storageBucket: "emotion-ba188.appspot.com",
  messagingSenderId: "464824560827",
  appId: "1:464824560827:web:2d79e68ce9cb4bb9bf4d9e",
  measurementId: "G-857FY173G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export default database;
