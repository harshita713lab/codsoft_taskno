
import { auth, provider } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const signupForm = document.getElementById('Sgn-up-from');

signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nameInput = document.querySelector('input[placeholder="Enter your Name"]').value;
    const emailInput = document.querySelector('input[type="email"]').value;
    const passwordInput = document.querySelector('input[type="password"]').value;

    if(nameInput === '' || emailInput === '' || passwordInput === '') {
        alert("Please fill all the details!");
        return; 
    }

    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
        .then((userCredential) => {
    
            const user = userCredential.user;
            
        
            localStorage.setItem('isLoggedIn', 'true'); 
            localStorage.setItem('quizUserName', nameInput); 
            
            alert("YAY! 🎉 Account created successfully on Firebase!");
            signupForm.reset(); 
            window.location.href = "dashboard.html"; 
        })
        .catch((error) => {
        
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                alert("This email is already registered! ❌ Please Login.");
            } else if (errorCode === 'auth/weak-password') {
                alert("Password is too weak! ❌ Please use at least 6 characters.");
            } else {
                alert("Error: " + error.message);
            }
        });
});

const googleBtn = document.getElementById('google-btn');


if (googleBtn) {
    googleBtn.addEventListener('click', function() {

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user; 
                
    
                localStorage.setItem('isLoggedIn', 'true'); 
                
                localStorage.setItem('quizUserName', user.displayName); 
                
                alert("YAY! 🎉 Logged in with Google successfully! Welcome " + user.displayName);
                window.location.href = "dashboard.html"; 
            })
            .catch((error) => {
                alert("Google Login Error: " + error.message);
            });
    });
}