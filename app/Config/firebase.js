import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbYYfRaZngFnUU0qRiHbkQOuX4Yi7O_Q8",
  authDomain: "fir-course-79179.firebaseapp.com",
  projectId: "fir-course-79179",
  storageBucket: "fir-course-79179.firebasestorage.app",
  messagingSenderId: "890438404515",
  appId: "1:890438404515:web:6b9a69482e0d29ebe6f216",
  measurementId: "G-VFX3MX2H12",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
