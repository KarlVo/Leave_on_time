import resolvePromise from '/src/resolvePromise.js';
import {searchStations, searchRoutes} from '/src/stationSource.js';

export default {

    // getLocationContentPromiseState.data: [
    //     {
    //         id: 1,
    //         title: "ÖSTRA STATION > ODENPLAN",
    //         departures: [
    //             {
    //                 id: 1,
    //                 type: 'BUS',
    //                 line: 4,
    //                 destination: 'Gullmarsplan',
    //                 timer: 11
    //             },
    //             {
    //                 ...
    //             },
    //         ],
    //     },
    //     {
    //         ...
    //     },
    // ],

    locations: [
        {
            id: 1,
            name: 'School',
            routes: []
        },
        {
            id: 2,
            name: 'Home',
            routes: [
                {
                    id: 1,
                    focused: false,
                    fromID: '9600',
                    fromName: 'Östra Station',
                    toID: '1079',
                    toName: 'Odenplan',
                    stationDistance: '11',
                    getRoutesPromiseState: {}
                },
                {
                    id: 2,
                    focused: false,
                    fromID: '9117',
                    fromName: 'Location 1',
                    toID: '9700',
                    toName: 'Location 2',
                    stationDistance: '11',
                    getRoutesPromiseState: {}
                },
                {
                    id: 3,
                    focused: true,
                    fromID: '1079',
                    fromName: 'Location 1',
                    toID: '9001',
                    toName: 'Location 2',
                    stationDistance: '11',
                    getRoutesPromiseState: {}
                },
                {
                    id: 4,
                    focused: false,
                    fromID: '9325',
                    fromName: 'Location 1',
                    toID: '3601',
                    toName: 'Location 2',
                    stationDistance: '11',
                    getRoutesPromiseState: {}
                }
            ]
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

    route: {
        id: null,
        focused: false,
        fromID: null,
        fromName: null,
        toID: null,
        toName: null,
        stationDistance: null,
        getRoutesPromiseState: {}
    },

    currentLocation: 2,

    // getLocationContentPromiseState: {},
    getFromStationsPromiseState: {},
    getToStationsPromiseState: {},
    getRoutesPromiseState: {},

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

    // buildLocationContent() {
    //     let prms = () => {
    //         let locationContent = [];
    //         const idx = this.locations.findIndex(location => location.id === this.currentLocation);

    //         this.locations[idx].routes.forEach((route) => {
    //             resolvePromise(searchRoutes(route.fromID, route.toID, route.stationDistance), this.getRoutesPromiseState);
    //         });
    //     }
        
    //     let prsms = this.locations[idx].routes.forEach((route) => {
    //         DoDisturbOff();
    //     });

    //     resolvePromise(prms, this.getLocationContentPromiseState);
    // },

    getRoutes(originId, destId, timeOffset, prms) {
        resolvePromise(searchRoutes(originId, destId, timeOffset), prms);
    },

    getStations(num, searchString) {
        if (num === 0) {
            resolvePromise(searchStations(searchString), this.getFromStationsPromiseState);
        } else if (num === 1) {
            resolvePromise(searchStations(searchString), this.getToStationsPromiseState);
        }
    },
    
    updateNewRoute(param, value) {
             if (param === 'fromID') { this.route.fromID = value; }
        else if (param === 'fromName') { this.route.fromName = value; }
        else if (param === 'toID') { this.route.toID = value; }
        else if (param === 'toName') { this.route.toName = value; }
        else if (param === 'stationDistance') { this.route.stationDistance = value; }
    },

    saveNewRoute() {
        const idx = this.locations.findIndex(location => location.id === this.currentLocation);

        if (this.locations[idx].routes.length > 0) {
            this.route.id = this.locations[idx].routes.slice(-1)[0].id + 1;
        } else {
            this.route.id = 1;
        }

        this.locations[idx].routes = [
            ...this.locations[idx].routes,
            this.route
        ];
        
        this.route = {
            id: null,
            focused: false,
            fromID: null,
            fromName: null,
            toID: null,
            toName: null,
            stationDistance: null,
            getRoutesPromiseState: {}
        };
        this.getFromStationsPromiseState = {};
        this.getToStationsPromiseState = {};
    },

    resetNewRoute() {
        this.route = {
            id: null,
            focused: false,
            fromID: null,
            fromName: null,
            toID: null,
            toName: null,
            stationDistance: null,
            getRoutesPromiseState: {}
        };
        this.getFromStationsPromiseState = {};
        this.getToStationsPromiseState = {};
    }
}