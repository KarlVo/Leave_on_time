import {STATIONS_URL, ROUTES_URL} from '/src/apiConfig.js';

export function searchStations(searchString) {
    const url = STATIONS_URL + searchString;
    return fetch(url).then(getJSONACB).then(keepResultArrayACB);
}

export function searchRoutes(originId, destId) {
    const url = ROUTES_URL + '&originId=' + originId + '&destId=' + destId;
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