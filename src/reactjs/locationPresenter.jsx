import { observer } from 'mobx-react-lite';
import LocationView from "../views/locationView";

export default observer (
    function Location(props) {
        function removeLocationACB(id) {
            props.model.removeLocation(id);
        }

        return (<LocationView
                    location={props.model.getLocation()}
                    lastLocation={props.model.lastLocation()}
                    removeLocation={removeLocationACB}
                />);
    }
)