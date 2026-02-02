// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bite-express-9f749.firebaseapp.com",
  projectId: "bite-express-9f749",
  storageBucket: "bite-express-9f749.firebasestorage.app",
  messagingSenderId: "502350989487",
  appId: "1:502350989487:web:69c6b7b9768504d4a7ac5a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app,auth}