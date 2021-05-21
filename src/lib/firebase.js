import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDG94NLkkQQJohQdIYH4B8-W8gUZZVrnwk",
  authDomain: "nandemoii-a15a3.firebaseapp.com",
  databaseURL: "https://nandemoii-a15a3-default-rtdb.firebaseio.com",
  projectId: "nandemoii-a15a3",
  storageBucket: "nandemoii-a15a3.appspot.com",
  messagingSenderId: "324266812975",
  appId: "1:324266812975:web:9aac052112a1ef7d0248da"
};

firebase.initializeApp(firebaseConfig); 
 export const db = firebase.firestore().collection("todo");
 