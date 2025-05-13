import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-firestore.js';
import { showLoading, hideLoading, showError } from './ui.js';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  client_id: '494648272586-clq3974hl3pfa0g312503p0l6bllebnd.apps.googleusercontent.com'
});

export async function login(email, password, errorElementId) {
  showLoading();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Email login successful');
    window.location.href = './index.html';
  } catch (error) {
    console.error('Login error:', error);
    showError(errorElementId, `Login failed: ${error.message}`);
  } finally {
    hideLoading();
  }
}

export async function signup(email, password, name, errorElementId) {
  showLoading();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, 'users', user.uid), { name, email });
    console.log('Signup successful:', { name, email });
    window.location.href = './index.html';
  } catch (error) {
    console.error('Signup error:', error);
    showError(errorElementId, `Signup failed: ${error.message}`);
  } finally {
    hideLoading();
  }
}

export async function signInWithGoogle(errorElementId) {
  showLoading();
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName || 'Anonymous',
        email: user.email
      });
    }
    console.log('Google Sign-In successful:', { name: user.displayName, email: user.email });
    window.location.href = './index.html';
  } catch (error) {
    console.error('Google Sign-In error:', error);
    showError(errorElementId, `Google Sign-In failed: ${error.message}`);
    if (error.code === 'auth/popup-blocked') {
      showError(errorElementId, 'Please allow popups for this site and try again.');
    }
  } finally {
    hideLoading();
  }
}

export async function resetPassword(email, errorElementId) {
  showLoading();
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent');
    showError(errorElementId, 'Password reset email sent!');
  } catch (error) {
    console.error('Reset password error:', error);
    showError(errorElementId, `Reset failed: ${error.message}`);
  } finally {
    hideLoading();
  }
}

export async function logout(errorElementId) {
  showLoading();
  try {
    await signOut(auth);
    console.log('Logout successful');
    window.location.href = './login.html';
  } catch (error) {
    console.error('Logout error:', error);
    showError(errorElementId, `Logout failed: ${error.message}`);
  } finally {
    hideLoading();
  }
}

export function checkAuth() {
  let hasRun = false;
  onAuthStateChanged(auth, (user) => {
    if (hasRun) return;
    hasRun = true;
    console.log('Auth state checked:', user ? 'User logged in' : 'No user');
    const currentPath = window.location.pathname;
    if (user) {
      if (currentPath.includes('login.html') || currentPath.includes('signup.html')) {
        window.location.href = './index.html';
      }
    } else {
      if (currentPath.includes('index.html') || currentPath.includes('profile.html')) {
        window.location.href = './login.html';
      }
    }
  }, (error) => {
    console.error('Auth state error:', error);
  });
}