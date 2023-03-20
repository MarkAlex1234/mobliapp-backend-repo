import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

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

const app = initializeApp(firebaseConfig);

function writeUserData(userId, busid, route, location){

    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    set(reference, {
        busId: busid,
        busRoute: route,
        busLocation: location
        //add those information here
    });
}

//put in the information
writeUserData("234123412", "23412341234");

