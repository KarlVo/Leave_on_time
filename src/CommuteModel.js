//array with objects
//struct /object

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
    myStations: [],

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

    setCurrentStation(stationName){
        stationName = 'Slussen';
        console.log("add Station");
        const prom = getStationID(stationName, true, 1);
        resolvePromise(prom, this.stationIDPromiseState);
    },

    getStationDetails(){
        console.log("nu kom vi hit");
        const prom = getTimeDetails();
        resolvePromise(prom, this.stationDetailsPromiseState)
        console.log("svar", this.stationDetailsPromiseState.data);
    },

    addStation(stationToAdd){
        this.myStations = [...this.myStations, stationToAdd];
    },
    removeStation(stationToRemove){
        console.log("remove Station");


    },



}