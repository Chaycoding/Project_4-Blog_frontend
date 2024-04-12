import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "blog-c9556.firebaseapp.com",
  projectId: "blog-c9556",
  storageBucket: "blog-c9556.appspot.com",
  messagingSenderId: "840928673591",
  appId: "1:840928673591:web:47ecd3cd16780b8f85e4b2",
});

// Initialize Firebase

const projectStorage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { projectStorage, auth, provider };
