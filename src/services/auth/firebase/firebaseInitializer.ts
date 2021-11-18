import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAc3wt5rytBi1BF9i9RLBGdmk5FXZ1aoRI",
  authDomain: "nv-oneclick.firebaseapp.com",
  projectId: "nv-oneclick",
  storageBucket: "nv-oneclick.appspot.com",
  messagingSenderId: "358191087358",
  appId: "1:358191087358:web:85efa03753760cc587afaf",
  measurementId: "G-0QY4DLEGG9",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth, firebase };