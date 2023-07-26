// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set, push } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAlv-tJ7JTZnz13smVCCBbEzRvDkGttKCg",
  authDomain: "react-nim.firebaseapp.com",
  databaseURL: "https://react-nim-default-rtdb.firebaseio.com",
  projectId: "react-nim",
  storageBucket: "react-nim.appspot.com",
  messagingSenderId: "261448265845",
  appId: "1:261448265845:web:b522b12575f6763e62083c",
  measurementId: "G-6SKHNTHN1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, ref, set };
