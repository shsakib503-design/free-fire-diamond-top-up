import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFE-VbD_13l4f5S3i_HgjCPkzGQrVUSwQ",
  authDomain: "free-fire-top-up-2fe02.firebaseapp.com",
  projectId: "free-fire-top-up-2fe02",
  storageBucket: "free-fire-top-up-2fe02.firebasestorage.app",
  messagingSenderId: "198242061394",
  appId: "1:198242061394:web:fc0ff91edde5cf6a61638b",
  measurementId: "G-XBPJ280T83"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Optional: helper export if you want to use serverTimestamp in other files
export { serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
