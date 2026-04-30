import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBWUXRuuXxBauln-DcMqemxKlCttgPJgo",
  authDomain: "krishna-pg-fd7ba.firebaseapp.com",
  projectId: "krishna-pg-fd7ba",
  storageBucket: "krishna-pg-fd7ba.firebasestorage.app",
  messagingSenderId: "1085896229432",
  appId: "1:1085896229432:web:e76eeaf8b00b2b311a9ccd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
