import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {

  apiKey: "AIzaSyC22L6jaHisQkF7BeSkD8egcbI4JHblVHw",
  authDomain: "appchat-react-firebase.firebaseapp.com",
  databaseURL: "https://appchat-react-firebase-default-rtdb.firebaseio.com",
  projectId: "appchat-react-firebase",
  storageBucket: "appchat-react-firebase.appspot.com",
  messagingSenderId: "589034453570",
  appId: "1:589034453570:web:905ec8485cd5e7cd394bdb"

};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

export default app;