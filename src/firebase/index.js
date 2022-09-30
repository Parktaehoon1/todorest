import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7yW3Jf8blN9G46PiSa0LW_kd-MjTP_J8",
  authDomain: "todolist-database-6c43c.firebaseapp.com",
  projectId: "todolist-database-6c43c",
  storageBucket: "todolist-database-6c43c.appspot.com",
  messagingSenderId: "724988735210",
  appId: "1:724988735210:web:6c2dd3c1e1fb6611a0f193",
  measurementId: "G-MYKEWKQCPT",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const USER_COLLECTION = db.collection("users");
