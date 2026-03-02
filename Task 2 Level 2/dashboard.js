import { auth } from './firebase.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        signOut(auth).then(() => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('quizUserName');
            alert("Logged out successfully! 👋");
            window.location.href = "login.html"; 
        }).catch((error) => {
            alert("Error logging out: " + error.message);
        });
    });
}