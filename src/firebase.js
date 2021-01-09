import firebase from 'firebase/app';
import "firebase/database"
var firebaseConfig = {
    apiKey: "AIzaSyBsrv43GnVj2gZKfCkMnXCcnIMJmQSIYTI",
    authDomain: "urltoword.firebaseapp.com",
    projectId: "urltoword",
    storageBucket: "urltoword.appspot.com",
    messagingSenderId: "84431087520",
    appId: "1:84431087520:web:a51e3c63fed2599d14e6c5",
    measurementId: "G-1DE4PE3QTM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export default firebase;