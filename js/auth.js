// js/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIxCrMdhYAG7p_iLoNXIkcnBhD6n1Kqek",
  authDomain: "motoapp-97373.firebaseapp.com",
  projectId: "motoapp-97373",
  storageBucket: "motoapp-97373.firebasestorage.app",
  messagingSenderId: "494648272586",
  appId: "1:494648272586:web:c82f4903f11b633",
  measurementId: "G-3HYCVRGDNE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize dropdown elements
const userButton = document.getElementById("user-button");
const dropdown = document.getElementById("dropdown");

if (userButton && dropdown) {
  // Toggle dropdown on user button click
  userButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent any default navigation
    e.stopPropagation(); // Prevent bubbling to parent elements
    console.log("User button clicked"); // Debug
    const isExpanded = userButton.getAttribute("aria-expanded") === "true";
    userButton.setAttribute("aria-expanded", !isExpanded);
    dropdown.classList.toggle("hidden");
    dropdown.classList.toggle("visible");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== userButton) {
      console.log("Clicked outside, closing dropdown"); // Debug
      userButton.setAttribute("aria-expanded", "false");
      dropdown.classList.add("hidden");
      dropdown.classList.remove("visible");
    }
  });

  // Close dropdown on Escape key for accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      console.log("Escape pressed, closing dropdown"); // Debug
      userButton.setAttribute("aria-expanded", "false");
      dropdown.classList.add("hidden");
      dropdown.classList.remove("visible");
    }
  });
} else {
  console.warn("User button or dropdown not found:", {
    userButton: !!userButton,
    dropdown: !!dropdown
  });
}

// Login form handling
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => window.location.href = "index.html")
      .catch(err => alert(err.message));
  });
}

// Signup form handling
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => updateProfile(userCredential.user, { displayName: name }))
      .then(() => window.location.href = "index.html")
      .catch(err => alert(err.message));
  });
}

// Logout button handling
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => signOut(auth).then(() => window.location.href = "index.html"));
}

// Forgot password handling
const forgotPasswordLink = document.getElementById("forgot-password");
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener("click", () => {
    const email = prompt("Enter your email to reset password:");
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => alert("Reset link sent. Check your inbox."))
        .catch(err => alert(err.message));
    }
  });
}

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    const nameField = document.getElementById("profile-name");
    const emailField = document.getElementById("profile-email");
    if (nameField && emailField) {
      nameField.textContent = "Name: " + (user.displayName || "No name");
      emailField.textContent = "Email: " + user.email;
    }
    const userBtn = document.getElementById("user-button");
    const username = user.displayName || "Profile";
    if (userBtn) userBtn.textContent = username;
    const unauth = document.getElementById("unauthenticated");
    const authBlock = document.getElementById("authenticated");
    const usernameDisplay = document.getElementById("username-display");
    if (unauth && authBlock && usernameDisplay) {
      unauth.classList.add("hidden");
      authBlock.classList.remove("hidden");
      //usernameDisplay.textContent = "Hi, " + username;
    }
    // Ensure dropdown is closed on auth state change
    if (dropdown) {
      userButton.setAttribute("aria-expanded", "false");
      dropdown.classList.add("hidden");
      dropdown.classList.remove("visible");
    }
  } else {
    // Reset UI for unauthenticated state
    const userBtn = document.getElementById("user-button");
    if (userBtn) userBtn.textContent = "User";
    const unauth = document.getElementById("unauthenticated");
    const authBlock = document.getElementById("authenticated");
    if (unauth && authBlock) {
      unauth.classList.remove("hidden");
      authBlock.classList.add("hidden");
    }
    // Close dropdown
    if (dropdown) {
      userButton.setAttribute("aria-expanded", "false");
      dropdown.classList.add("hidden");
      dropdown.classList.remove("visible");
    }
  }
});
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

// Google Sign-In
const googleLoginBtn = document.getElementById("google-login");
if (googleLoginBtn) {
  const provider = new GoogleAuthProvider();
  googleLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(() => window.location.href = "index.html")
      .catch((err) => alert(err.message));
  });
}
