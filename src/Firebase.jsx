// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf8XWiStRM_-yL67VRhr22XUqp1z7kpsA",
  authDomain: "todolist-a8793.firebaseapp.com",
  projectId: "todolist-a8793",
  storageBucket: "todolist-a8793.appspot.com",
  messagingSenderId: "684877392911",
  appId: "1:684877392911:web:8043db57078171115c477a"
};

// Initialize Firebase
export const FIRE_BASE_APP  = initializeApp(firebaseConfig);
export const FIRE_BASE_AUTH = getAuth(FIRE_BASE_APP);
export const Fire_store_DB = getFirestore(FIRE_BASE_APP)
