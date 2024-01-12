// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdPo-srXr2xWZWoyuHpzaE-wqXuaQ28u8",
  authDomain: "job-portal-mern-app.firebaseapp.com",
  projectId: "job-portal-mern-app",
  storageBucket: "job-portal-mern-app.appspot.com",
  messagingSenderId: "323444499091",
  appId: "1:323444499091:web:3b46cd3ea0139b14b8a366"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);