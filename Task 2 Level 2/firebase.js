import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
// GoogleAuthProvider ko bhi import kiya 👇
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAQItBxqIKbALrvoqnZkO3LpIBvvmr4pw",
  authDomain: "codsoft-quizapp.firebaseapp.com",
  projectId: "codsoft-quizapp",
  storageBucket: "codsoft-quizapp.firebasestorage.app",
  messagingSenderId: "931788393354",
  appId: "1:931788393354:web:2dc23c9fc540f8cf7f1673"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// Google Login ke liye Provider banaya 👇
export const provider = new GoogleAuthProvider();