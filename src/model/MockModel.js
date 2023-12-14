export default {

    locations: [
        {
            id: 1,
            name: 'School',
            stations: [
                {
                    id: 345,
                    distance: 6,
                    lines: [345, 23, 95]
                }
            ]
        },
        {
            id: 2,
            name: 'Home',
            stations: [
                {
                    id: 345,
                    distance: 6,
                    lines: [345, 23, 95]
                }
            ]
        },
        {
            id: 3,
            name: 'Work',
            stations: [
                {
                    id: 345,
                    distance: 6,
                    lines: [345, 23, 95]
                }
            ]
        },
        {
            id: 4,
            name: 'Parrents',
            stations: [
                {
                    id: 345,
                    distance: 6,
                    lines: [345, 23, 95]
                }
            ]
        }
    ],

    currentLocation: 2,

    addLocation(locationName) {
        const locationID = this.locations.slice(-1)[0].id + 1;
        this.locations = [
            ...this.locations,
            {
                id: locationID,
                name: locationName,
                stations: []
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
        if (this.locations.length < 2) {
            return true;
        }
        return false;
    },
}