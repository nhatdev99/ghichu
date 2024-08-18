// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCm4sHX7Q-ueJ8Z3d-UutXwiek-6OE9o7w",
    authDomain: "simplenote-ec471.firebaseapp.com",
    projectId: "simplenote-ec471",
    storageBucket: "simplenote-ec471.appspot.com",
    messagingSenderId: "491221292713",
    appId: "1:491221292713:web:4a8cbfe5c4246c3a0ffbb8"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db }