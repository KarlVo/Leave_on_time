export function searchStations(searchString) {
    const url = 'http://localhost:8085/https://journeyplanner.integration.sl.se/v1/typeahead.json?key=68dc79d3e89d4b7a9b37416022096d7a&searchstring=' + searchString;
    return fetch(url).then(getJSONACB).then(keepResultArrayACB);
}

export function searchRoutes(originId, destId) {
    const url = 'http://localhost:8085/https://api.sl.se/api2/TravelplannerV3_1/trip.json?key=9d6ad9f990ec47b2a56c96912bcc494b&Lang=en&originId=' + originId + '&destId=' + destId;
    return fetch(url).then(getJSONACB);
}

function getJSONACB(response) { 
    if (!response.ok) {
        throw new Error("Response gets error, Error found" + response.status);
    }

    return response.json();
}

function keepResultArrayACB(response) {
    return response.ResponseData;
}