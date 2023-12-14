import {observer} from 'mobx-react-lite';

import SidebarView from "/src/views/sidebarView.jsx";

export default observer (
    function Sidebar(props) {
        function addLocationACB(locationName) {
            props.model.addLocation(locationName);
        }

        function setLocationACB(id) {
            props.model.setLocation(id);
        }

        return (
            <SidebarView
                locations={props.model.locations}
                currentLocation={props.model.currentLocation}
                addLocation={addLocationACB}
                setLocation={setLocationACB}
            />
        );
    }
);