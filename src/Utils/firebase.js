// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Bz0_ByqbDMDg54LZpYYf9o-um_VSp6M",
  authDomain: "netflixgpt-376a7.firebaseapp.com",
  projectId: "netflixgpt-376a7",
  storageBucket: "netflixgpt-376a7.appspot.com",
  messagingSenderId: "609413717953",
  appId: "1:609413717953:web:3cdfdf01ba531d64f15940"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
