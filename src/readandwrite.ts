import firebase from "firebase-admin";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { Logger } from "@nestjs/common";
import { adminDatabase } from "./main";
import { read } from "fs";
export const initial = () => {

if(adminDatabase !== null){
  Logger.log("Acitvated [Read,Write]");
}else{
  Logger.log("Deactivated [Read,Write]");
}
const db = getDatabase();
//Write data
function writeUserData(id, route, location) {
  set(ref(db, 'Bus/'), {
    busId: id,
    busRoute: route,
    busLocation : location
  });
}
writeUserData("1245304862","ewrqwerqwfqwef", "XD");
//Reading user data
const busReference = ref(db, 'Bus/');
onValue(busReference, (busData) => {
  const data = busData.val();
  Logger.log("BusID: " + data.busId);
  Logger.log("BusRoute: " + data.busRoute);
  Logger.log("BusLocation: " + data.busLocation); 
});

function readuserdata(objectRef): string{
  const busRef = ref(db, objectRef);
  let tempdata;
  onValue(busRef, (busData) => {
  tempdata = busData.val();
});

if(tempdata !== null){
  return "BusID: " + tempdata.busId + "; " + "BusRoute: " + tempdata.busRoute + "; " +"BusLocation: " + tempdata.busLocation;
}
else{
  return "";
}
}

Logger.log(readuserdata('Bus/'));
}