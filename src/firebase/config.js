import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBFyRF7qT8iGYk-t5_cNxSndPfNBrNh70Q",
  authDomain: "api-app-delivery-992fa.firebaseapp.com",
  projectId: "api-app-delivery-992fa",
  storageBucket: "api-app-delivery-992fa.appspot.com",
  messagingSenderId: "961369885360",
  appId: "1:961369885360:web:51fd3b88a6d1ad24980975",
  measurementId: "G-XBP1P4NEWF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;