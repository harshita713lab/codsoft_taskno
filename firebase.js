import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";


import { API_KEY } from "./config.js";

const firebaseConfig = {
  apiKey: API_KEY, 
  authDomain: "codsoft-quizapp.firebaseapp.com",
  projectId: "codsoft-quizapp",
  storageBucket: "codsoft-quizapp.firebasestorage.app",
  messagingSenderId: "931788393354",
  appId: "1:931788393354:web:2dc23c9fc540f8cf7f1673"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();