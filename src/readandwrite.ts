import firebase from "firebase/app";
// import "firebase/database";
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

firebase.initializeApp(firebaseConfig);

// let Ref = firebase.database().ref("/Bus");

const database = getDatabase();

function writeUserData(Id, Route, Location){
  const db = getDatabase();
  set(ref(db, '/Bus'), {
    busId: Id,
    busRoute: Route,
    busLocation: Location
  });
}

writeUserData("12342134", "Here to there", "nowhere");
//write data
// database.ref("/Bus/:busId").set({
//   busId: "busId",
//   busRoute: "busRoute",
//   busLocation: "busLocation",
// });

//read data
// database.ref("/Bus/:busId").on("value", (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
// })
// database
// .ref("/Bus/:busId")
// .once("value")
// .then((snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
// });
