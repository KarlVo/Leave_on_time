import {observer} from 'mobx-react-lite';

import LocationView from "/src/views/locationView.jsx";

export default observer (
    function Location(props) {
        function removeLocationACB(id) {
            props.model.removeLocation(id);
        }

        function renameLocationACB(name) {
            props.model.renameLocation(name);
        }

        function getRoutesACB(originId, destId, timeOffset, prms) {
            props.model.getRoutes(originId, destId, timeOffset, prms);
        }

        function deleteRouteACB(id) {
            props.model.deleteRoute(id);
        }  

        function setCurrentRouteACB(id) {
            props.model.setCurrentRoute(id)
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