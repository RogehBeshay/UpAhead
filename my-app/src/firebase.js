import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyByR94It78Ogsmn9k5lNER28HjS3keUQX8",
    authDomain: "upahead-b5f45.firebaseapp.com",
    projectId: "upahead-b5f45",
    storageBucket: "upahead-b5f45.firebasestorage.app",
    messagingSenderId: "402867632842",
    appId: "1:402867632842:web:6c0fadad4343f091335233",
    measurementId: "G-7MPNYE64H3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
