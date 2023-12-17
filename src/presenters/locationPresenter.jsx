import {observer} from 'mobx-react-lite';

import LocationView from "/src/views/locationView.jsx";

export default observer (
    function Location(props) {
        function removeLocationACB(id) {
            props.model.removeLocation(id);
        }

        function renameLocationACB(newLocationName) {
            props.model.renameLocation(newLocationName);
        }

        function getRoutesACB(originId, destId, timeOffset, prms) {
            props.model.getRoutes(originId, destId, timeOffset, prms);
        }

        function deleteRouteACB(routeId) {
            props.model.deleteRoute(props.currentLocation, routeId)
        }  

        function setCurrentRouteACB(routeId) {
            props.model.setCurrentRoute(routeId)
        }

        return (
            <LocationView
                location={props.model.getLocation()}
                lastLocation={props.model.lastLocation()}
                removeLocation={removeLocationACB}
                renameLocation={renameLocationACB}
                getRoutes={getRoutesACB}
                deleteRoute={deleteRouteACB}
                setCurrentRoute={setCurrentRouteACB}
            />
        );
    }
);