import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDO97riRCrWlQwGhO-E3A7AKhdz5ZNAqP4",
  authDomain: "chatapp-bf729.firebaseapp.com",
  projectId: "chatapp-bf729",
  storageBucket: "chatapp-bf729.appspot.com",
  messagingSenderId: "801500776944",
  appId: "1:801500776944:web:21fd0db397ef2dabafb535",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authenticating Firebase
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

//Default Export
export default auth;

//Named Export
export { db, storage };
