// 1. Firebase auth aur login function ko import karein
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const loginForm = document.getElementById('Login-form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const emailInput = document.querySelector('input[type="email"]').value;
    const passwordInput = document.querySelector('input[type="password"]').value;

    
    signInWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
            // Agar login successful ho gaya
            alert("Login Successful! 🎉 Welcome back.");
            localStorage.setItem('isLoggedIn', 'true'); 
            window.location.href = "dashboard.html"; 
        })
        .catch((error) => {
    
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                alert("Invalid Email or Password! ❌ Please try again.");
            } else {
                alert("Error: " + error.message);
            }
        });
});