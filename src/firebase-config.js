import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC_BMcv81zkvyCOdvH46QCMNMRianHIX1E",
  authDomain: "library-d0b16.firebaseapp.com",
  projectId: "library-d0b16",
  storageBucket: "library-d0b16.appspot.com",
  messagingSenderId: "331250301547",
  appId: "1:331250301547:web:9d70288176b9822a7a0f2e",
  measurementId: "G-PSBMW5NNBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);