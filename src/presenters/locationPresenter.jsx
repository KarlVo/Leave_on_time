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

        return (
            <LocationView
                location={props.model.getLocation()}
                lastLocation={props.model.lastLocation()}
                removeLocation={removeLocationACB}
                renameLocation={renameLocationACB}
            />
        );
    }
);