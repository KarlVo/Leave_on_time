import {observer} from 'mobx-react-lite';

import AddRouteView from "/src/views/addRouteView.jsx";

export default observer (
    function AddRoute(props) {
        function getStationsACB(searchString) {
            props.model.getStations(searchString);
        }

        // function getStationsACB(pos, searchString) {
        //     props.model.getStations(pos, searchString);
        // }

        // function updateNewRouteACB(param, value) {
        //     props.model.updateNewRoute(param, value);
        // }

        // function saveNewRouteACB() {
        //     props.model.saveNewRoute();
        // }

        return (
            <AddRouteView
                location={props.model.getLocation()}
                // fromStations={props.model.getFromStationsPromiseState.data}
                // toStations={props.model.getToStationsPromiseState.data}
                stations={props.model.getStationsPromiseState.data}
                getStations={getStationsACB}
                // route={props.model.route}
                // updateNewRoute={updateNewRouteACB}
                // saveNewRoute={saveNewRouteACB}
            />
        );
    }
);