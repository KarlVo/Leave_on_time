//array with objects
//struct /object

import { getTimeDetails } from "./timetableSource";

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


    addStation(){
        console.log("hej");
    },

    getStationDetails(){
        const prom = getTimeDetails();
    }



}