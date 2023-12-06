import { observer } from 'mobx-react-lite';
import SidebarView from "../views/sidebarView";

export default observer (
    function Sidebar(props) {
        function addLocationACB(locationName) {
            props.model.addLocation(locationName);
        }

        function addLocationToggleACB() {
            props.model.addLocationToggle();
        }

        function setLocationACB(id) {
            props.model.setLocation(id);
        }

        return (<SidebarView
                    locations={props.model.locations}
                    currentLocation={props.model.currentLocation}
                    addingLocation={props.model.addingLocation}
                    addLocation={addLocationACB}
                    addLocationToggle={addLocationToggleACB}
                    setLocation={setLocationACB}
                />);
    }
)