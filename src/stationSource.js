import {STATIONS_URL, ROUTES_URL, HEADERS} from '/src/apiConfig.js';

export function searchStations(searchString) {
    const url = STATIONS_URL + searchString;
    return fetch(url, HEADERS).then(getJSONACB).then(keepResultArrayACB);
}

export function searchRoutes(originId, destId, timeOffset) {
    const dateTime = new Date();
    dateTime.setMinutes(dateTime.getMinutes() + parseInt(timeOffset) + (-1)*(dateTime.getTimezoneOffset()));

    const date = dateTime.toISOString().slice(0, 10);
    const time = dateTime.toISOString().slice(11, 16);

    const url = ROUTES_URL + '&originId=' + originId + '&destId=' + destId + '&Date=' + date + '&Time=' + time + '&numF=' + '4' + '&numB=' + '0';
    return fetch(url, HEADERS).then(getJSONACB);
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