// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAuzUECtqkV3AMiZb6bFd-MhugyHcLeyyU",
  authDomain: "free-fire-order.firebaseapp.com",
  projectId: "free-fire-order",
  storageBucket: "free-fire-order.firebasestorage.app",
  messagingSenderId: "481898808948",
  appId: "1:481898808948:web:310fb3d6885218a7487321",
  measurementId: "G-VPDMD53F3H"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
