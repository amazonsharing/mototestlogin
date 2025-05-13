import { auth, db } from './firebase.js';
import { doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/11.7.0/firebase-firestore.js';
import { showLoading, hideLoading, showError } from './ui.js';

export async function loadProfile() {
  showLoading();
  try {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const profileImage = document.getElementById('profileImage');
      const nameInput = document.getElementById('name');
      const emailSpan = document.getElementById('email');
      if (userDoc.exists()) {
        const data = userDoc.data();
        nameInput.value = data.name || user.displayName || 'Anonymous';
      } else {
        nameInput.value = user.displayName || 'Anonymous';
      }
      profileImage.src = user.photoURL || 'https://via.placeholder.com/100';
      emailSpan.textContent = user.email;
      console.log('Profile loaded:', { name: nameInput.value, email: user.email, photoURL: user.photoURL });
    } else {
      console.error('No user logged in');
      window.location.href = './login.html';
    }
  } catch (error) {
    console.error('Load profile error:', error);
    showError('error', `Failed to load profile: ${error.message}`);
  } finally {
    hideLoading();
  }
}

export async function updateProfile(name, errorElementId) {
  showLoading();
  try {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { name, email: user.email }, { merge: true });
      console.log('Profile updated:', { name });
      showError(errorElementId, 'Profile updated successfully!');
    }
  } catch (error) {
    console.error('Update profile error:', error);
    showError(errorElementId, `Failed to update profile: ${error.message}`);
  } finally {
    hideLoading();
  }
}