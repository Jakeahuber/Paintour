// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9305R3airW-6e63T8v-KIx2XTRch-eQo",
  authDomain: "sketch-c3044.firebaseapp.com",
  projectId: "sketch-c3044",
  storageBucket: "sketch-c3044.appspot.com",
  messagingSenderId: "741911403223",
  appId: "1:741911403223:web:2aac30752be3cb4dc8ee92",
  measurementId: "G-LPTJFPZQ1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;