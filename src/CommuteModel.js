import { getTimeDetails, getStationID } from "./timetableSource";
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

    /*locations: [
        {
            id: 1,
            name: 'Default Location',
            stations: [
                {
                    id: 345,
                    distance: 6,
                    lines: [345, 23, 95]
                }
            ],
        }
    ],*/
    currentLocation: 1,
    locations: [
        {
            id: 1,
            name: 'Default Location',
            stations: [],
        },
    ],
    addingLocation: false,

    commuteStations: [],
    commuteDistances: [],
    intrestedLines: [],
    currentID: null,
    currentStation: null,
    myStations: [],

    //omar lägger till lite kod som säkert redan överrenstämmer med det simon har skrivit
    stations:[
        {name: null, towards: null, line: null, min: null, id: null}
    ],

    stationIDPromiseState: {},
    stationDetailsPromiseState: {},



    lastLocation() {
        if (this.locations.length < 2) {
            return true;
        }
        return false;
    },

    removeLocation(locationID) {
        this.locations = this.locations.filter(location => location.id !== locationID);
        this.currentLocation = this.locations[0].id;
    },

    addLocation(locationName) {
        const locationID = this.locations.slice(-1)[0].id + 1;
        this.locations = [
            ...this.locations,
            {
                id: locationID,
                name: locationName,
                stations: [],
            }
        ];
        this.currentLocation = locationID;
    },

    addLocationToggle() {
        this.addingLocation = !this.addingLocation;
    },

    setLocation(locationID) {
        this.currentLocation = locationID;
    },

    getLocation() {
        return this.locations.find(location => location.id === this.currentLocation);
    },


    //den här är för namenet, x, y koordinater
    setCurrentStation(stationName){
        const oldStation = this.currentStation;
        this.currentStation = stationName;
        console.log("add Station");
        const prom = getStationID(stationName, true, 1);
        resolvePromise(prom, this.stationIDPromiseState);
    },

    // det här är för tiden
    getStationDetails(){
        const prom = getTimeDetails();
        resolvePromise(prom, this.stationDetailsPromiseState)
    },

    addStation(stationToAdd){
        this.myStations = [...this.myStations, stationToAdd];
    },

    removeStation(stationToRemove){
        console.log("remove Station");
    },

    saveInfo(informationObject){
        this.setCurrentStation(informationObject.name)
        /*parsa igenom informationen som vi får tillbaka, hitta ID, X och Y location*/
        
        
        informationObject.id = this.stationIDPromiseState.data.stationID/* Parsning av ID*/
        informationObject.X = this.stationIDPromiseState.data.stationX/*X värdet*/
        informationObject.Y = this.stationIDPromiseState.data.stationY/* Y */
        this.stations.push(informationObject);
        console.log("omartest", this.stations)

    }



}