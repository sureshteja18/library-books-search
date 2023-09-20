import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyDS_fsDvUX8O70oHwHr0KHQmmKco71P7Eo",
  authDomain: "library-crud-7b9d8.firebaseapp.com",
  projectId: "library-crud-7b9d8",
  storageBucket: "library-crud-7b9d8.appspot.com",
  messagingSenderId: "207762875270",
  appId: "1:207762875270:web:75e853e7d0a3f48acac207"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =getFirestore(app);