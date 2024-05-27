// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZmfFBX_1Q01xAk8frrE-gF_IakU6BSN8",
  authDomain: "petapp-8752b.firebaseapp.com",
  databaseURL: "https://petapp-8752b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "petapp-8752b",
  storageBucket: "petapp-8752b.appspot.com",
  messagingSenderId: "616591002356",
  appId: "1:616591002356:web:02168c486b92642b89aca1",
  measurementId: "G-LEL72ZBBW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);





export {app,auth};



