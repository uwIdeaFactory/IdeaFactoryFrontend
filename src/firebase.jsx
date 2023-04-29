// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGuDexRDMTsn0yFfAm0pZIDR_D4fTGWxY",
    authDomain: "ideafactoryauth.firebaseapp.com",
    projectId: "ideafactoryauth",
    storageBucket: "ideafactoryauth.appspot.com",
    messagingSenderId: "584335191585",
    appId: "1:584335191585:web:ce2a34d76a34d4dfcf7d60",
    measurementId: "G-EKL70WJ20N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth }
