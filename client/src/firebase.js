// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdZApskp1vRxB_Ng1EqAH1WaUlyvMsFUQ",
  authDomain: "video-74265.firebaseapp.com",
  projectId: "video-74265",
  storageBucket: "video-74265.appspot.com",
  messagingSenderId: "226153823855",
  appId: "1:226153823855:web:31b8157e228dc92a9a179a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;