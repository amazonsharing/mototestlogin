# MotoApp
A motorsport-themed web app with Firebase Authentication and Firestore.

## Setup
1. Install Node.js from [nodejs.org](https://nodejs.org).
2. Run `npm install` in the project root.
3. Start the local server: `npm start`.
4. Open `http://localhost:3000/login.html`.

## Firebase
- Ensure `localhost` is in Authentication > Settings > Authorized domains.
- Enable Google and Email/Password in Authentication.
- Set Firestore rules in Firestore Database > Rules.

## Structure
- `public/`: Static files (HTML, CSS, JS, assets).
- `public/js/`: Firebase and app logic.
- `public/css/`: Stylesheets.
- `public/assets/`: Images and icons.