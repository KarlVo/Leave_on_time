import {observer} from 'mobx-react-lite';

import EditRouteView from "/src/views/editRouteView.jsx";

export default observer (
    function EditRoute(props) {
        function getRoutesACB(originId, destId, timeOffset) {
            props.model.getRoutes(originId, destId, timeOffset);
        }

        return (
            <EditRouteView
                location={props.model.getLocation()}
                getRoutes={getRoutesACB}
                routes={props.model.getRoutesPromiseState.data}
            />
        );
    }
);