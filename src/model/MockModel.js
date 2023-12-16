import resolvePromise from '/src/resolvePromise.js';
import {searchStations} from '/src/stationSource.js';

export default {

    locations: [
        {
            id: 1,
            name: 'School',
            routes: []
        },
        {
            id: 2,
            name: 'Home',
            routes: []
        },
        {
            id: 3,
            name: 'Work',
            routes: []
        },
        {
            id: 4,
            name: 'Parrents',
            routes: []
        }
    ],

    // route: {
    //     id: null,
    //     fromID: null,
    //     fromName: null,
    //     toID: null,
    //     toName: null,
    //     stationDistance: null
    // },

    currentLocation: 2,

    getFromStationsPromiseState: {},
    getToStationsPromiseState: {},

    addLocation(locationName) {
        const locationID = this.locations.slice(-1)[0].id + 1;
        this.locations = [
            ...this.locations,
            {
                id: locationID,
                name: locationName,
                routes: []
            }
        ];
    },

    setLocation(id) {
        this.currentLocation = id;
    },

    getLocation() {
        return this.locations.find(location => location.id === this.currentLocation);
    },

    renameLocation(newLocationName) {
        const idx = this.locations.findIndex(location => location.id === this.currentLocation);
        this.locations[idx].name = newLocationName;
    },

    removeLocation(id) {
        this.locations = this.locations.filter(location => location.id !== id);
        this.currentLocation = this.locations[0].id;
    },

    lastLocation() {
        return this.locations.length < 2;
    },

    // getStations(pos, searchString) {
    //     if (pos === 'from') {
    //         resolvePromise(searchStations(searchString), this.getFromStationsPromiseState);
    //     } else {
    //         resolvePromise(searchStations(searchString), this.getToStationsPromiseState);
    //     }
    // },

    getStations(num, searchString) {
        if (num === 0) {
            resolvePromise(searchStations(searchString), this.getFromStationsPromiseState);
        } else if (num === 1) {
            resolvePromise(searchStations(searchString), this.getToStationsPromiseState);
        }
    },
    
    // updateNewRoute(param, value) {
    //          if (param === 'fromID') { this.route.fromID = value; }
    //     else if (param === 'fromName') { this.route.fromName = value; }
    //     else if (param === 'toID') { this.route.toID = value; }
    //     else if (param === 'toName') { this.route.toName = value; }
    //     else if (param === 'stationDistance') { this.route.stationDistance = value; }
    // },

    // saveNewRoute() {
    //     const idx = this.locations.findIndex(location => location.id === this.currentLocation);

    //     if (this.locations[idx].routes.length > 0) {
    //         this.route.id = this.locations[idx].routes.slice(-1)[0].id + 1;
    //     } else {
    //         this.route.id = 1;
    //     }

    //     this.locations[idx].routes = [
    //         ...this.locations[idx].routes,
    //         this.route
    //     ];
        
    //     this.route = {
    //         id: null,
    //         fromID: null,
    //         fromName: null,
    //         toID: null,
    //         toName: null,
    //         stationDistance: null
    //     }
    // }
}