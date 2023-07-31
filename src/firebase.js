import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBI_W4-VYiPLtQQRg9_HD-HDzDv0YeMECU',
  authDomain: 'crud-project-4ecfa.firebaseapp.com.firebaseapp.com',
  projectId: 'crud-project-4ecfa',
  storageBucket: 'crud-project-4ecfa.appspot.com',
  messagingSenderId: '212074693580',
  appId: '1:212074693580:web:1d223f439c11b88a1ed369',
  measurementId: "G-H6EYVWB7HV"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
