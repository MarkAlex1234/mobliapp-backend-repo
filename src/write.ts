import firebase from "firebase-admin";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDNOPHgGhibR_c7mAUsBW8fZPWXlVsWzc0",
  authDomain: "mobli-backend.firebaseapp.com",
  databaseURL: "https://mobli-backend-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mobli-backend",
  storageBucket: "mobli-backend.appspot.com",
  messagingSenderId: "286542289831",
  appId: "1:286542289831:web:59c64d9921c4c2b93af482",
  measurementId: "G-QPKMWH0P07"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

database.ref("Bus/:busId").set({
    busId: "busId",
    busRoute: "busRoute",
    busLocation: "busLocation",
});
