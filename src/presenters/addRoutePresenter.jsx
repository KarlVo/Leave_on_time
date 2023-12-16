import {observer} from 'mobx-react-lite';

import AddRouteView from "/src/views/addRouteView.jsx";

export default observer (
    function AddRoute(props) {
        function getStationsACB(num, searchString) {
            props.model.getStations(num, searchString);
        }

        function updateNewRouteACB(param, value) {
            props.model.updateNewRoute(param, value);
        }

        function saveNewRouteACB() {
            props.model.saveNewRoute();
        }

        return (
            <AddRouteView
                location={props.model.getLocation()}
                fromStations={props.model.getFromStationsPromiseState.data}
                toStations={props.model.getToStationsPromiseState.data}
                getStations={getStationsACB}
                route={props.model.route}
                updateNewRoute={updateNewRouteACB}
                saveNewRoute={saveNewRouteACB}
            />
        );
    }
);