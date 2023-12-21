import {observer} from 'mobx-react-lite';

import RouteView from "/src/views/routeView.jsx";

export default observer (
    function Route(props) {
        function deleteRouteACB(id) {
            props.deleteRoute(id);
        }

        function setCurrentRouteACB(id) {
            props.setCurrentRoute(id);
        }

        function focusSwitchACB(id) {
            props.focusSwitch(id);
        }

        return (
            <RouteView
                route={props.route}
                deleteRoute={deleteRouteACB}
                setCurrentRoute={setCurrentRouteACB}
                getRoutesPromiseState={props.getRoutesPromiseState}
                focusSwitch={focusSwitchACB}
            />
        );
    }
);