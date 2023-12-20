import resolvePromise from '/src/resolvePromise.js';
import {searchStations, searchRoutes} from '/src/stationSource.js';

export default {

    locations: [
        {
            id: 1,
            name: 'Default Location',
            routes: []
        }
    ],
    // locations: [
    //     {
    //         id: 1,
    //         name: 'School',
    //         routes: []
    //     },
    //     {
    //         id: 2,
    //         name: 'Home',
    //         routes: [
    //             {
    //                 id: 1,
    //                 focused: false,
    //                 fromID: '9600',
    //                 fromName: 'Östra Station',
    //                 toID: '1079',
    //                 toName: 'Odenplan',
    //                 stationDistance: '11'
    //             },
    //             {
    //                 id: 2,
    //                 focused: false,
    //                 fromID: '9117',
    //                 fromName: 'T-Centralen',
    //                 toID: '9700',
    //                 toName: 'Odenplan',
    //                 stationDistance: '11'
    //             },
    //             {
    //                 id: 3,
    //                 focused: true,
    //                 fromID: '1079',
    //                 fromName: 'Stockholm City',
    //                 toID: '9001',
    //                 toName: 'Gullmarsplan',
    //                 stationDistance: '11'
    //             },
    //             {
    //                 id: 4,
    //                 focused: false,
    //                 fromID: '9325',
    //                 fromName: 'Sundbybergs Station',
    //                 toID: '3601',
    //                 toName: 'Bromma Blocks',
    //                 stationDistance: '11'
    //             }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         name: 'Work',
    //         routes: []
    //     },
    //     {
    //         id: 4,
    //         name: 'Parrents',
    //         routes: []
    //     }
    // ],

    route: {
        id: null,
        focused: false,
        fromID: null,
        fromName: null,
        toID: null,
        toName: null,
        stationDistance: null
    },

    currentLocation: 1,
    currentRoute: null,

    getRoutesPromiseStates: {},
    getFromStationsPromiseState: {},
    getToStationsPromiseState: {},

    setRoutesPromiseState(locationID, routeID) {
        if (!this.getRoutesPromiseStates[locationID]) {
            this.getRoutesPromiseStates[locationID] = {};
            this.getRoutesPromiseStates[locationID][routeID] = {};
        } else if (!this.getRoutesPromiseStates[locationID][routeID]) {
            this.getRoutesPromiseStates[locationID][routeID] = {};
        }
    },

    setLocation(id) {
        this.currentLocation = id;
    },

    getLocation() {
        return this.locations.find(location => location.id === this.currentLocation);
    },

    renameLocation(name) {
        const idx = this.locations.findIndex(location => location.id === this.currentLocation);
        this.locations[idx].name = name;
    },

    addLocation(name) {
        const locationID = this.locations.slice(-1)[0].id + 1;
        this.locations = [
            ...this.locations,
            {
                id: locationID,
                name: name,
                routes: []
            }
        ];
    },

    removeLocation(id) {
        this.locations = this.locations.filter(location => location.id !== id);
        this.currentLocation = this.locations[0].id;
    },

    lastLocation() {
        return this.locations.length < 2;
    },

    getStations(num, searchString) {
        if (num === 0) {
            resolvePromise(searchStations(searchString), this.getFromStationsPromiseState);
        } else if (num === 1) {
            resolvePromise(searchStations(searchString), this.getToStationsPromiseState);
        }
    },

    getRoutes(originId, destId, timeOffset, prms) {
        resolvePromise(searchRoutes(originId, destId, timeOffset), prms);
    },

    getRoutePosition () {
        const idx = this.locations.findIndex(location => location.id === this.currentLocation);
        return this.locations[idx].routes.findIndex(route => route.id === this.currentRoute);
    },

    setCurrentRoute(id) {
        this.currentRoute = id;
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
            stationDistance: null
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
            stationDistance: null
        };
        this.getFromStationsPromiseState = {};
        this.getToStationsPromiseState = {};
    },

    deleteRoute(id) {
        const idx = this.locations.findIndex(location => location.id === this.currentLocation);
        this.locations[idx].routes = this.locations[idx].routes.filter(location => location.id !== id);
    }

}