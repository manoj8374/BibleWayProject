import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCvGQ-vx4gurpz2zcUDlEWxjkEzYcYltx0",
  authDomain: "skilled-acolyte-463919-u1.firebaseapp.com",
  projectId: "skilled-acolyte-463919-u1",
  storageBucket: "skilled-acolyte-463919-u1.firebasestorage.app",
  messagingSenderId: "457831043414",
  appId: "1:457831043414:web:a964070bffd6cfee3c06f7",
  measurementId: "G-QZ9V8M4M7H"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);


