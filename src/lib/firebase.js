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
export default firebase;
export const db_todo = firebase.firestore().collection("todo");
export const db_user = firebase.firestore().collection("user");

export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};
