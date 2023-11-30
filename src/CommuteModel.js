//array with objects
//struct /object

import { getDishDetails, getTimeDetails } from "./timetableSource";
import { getStationID } from "./timetableSource";
import resolvePromise from "./resolvePromise.js";

//attributes:
//  name
//  id
// distacne
// interested lines
//

//metod som tar current time och jämför när bussen kommer och hur lång tid det tar att gå och returnerar någon tid


//metod lägga till station


//metod ta bort staion

//metod justera walktime till station

export default {

    commuteStations: [],
    commuteDistances: [],
    intrestedLines: [],
    currentID: null,
    myStations: [],

    stationIDPromiseState: {},
    stationDetailsPromiseState: {},

    setCurrentStation(stationName){
        stationName = 'Slussen';
        console.log("add Station");
        const prom = getStationDetails(stationName, true, 1);
        resolvePromise(prom, this.stationIDPromiseState);
    },

    getStationDetails(){
        console.log("nu kom vi hit");
    getStationDetails(stationID){
        const prom = getTimeDetails();
    },

    addStation(stationToAdd){
        this.myStations = [...this.myStations, stationToAdd];
    },
    removeStation(stationToRemove){
        console.log("remove Station");


    },



}