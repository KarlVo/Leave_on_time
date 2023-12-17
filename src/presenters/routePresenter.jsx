import {observer} from 'mobx-react-lite';

import RouteView from "/src/views/routeView.jsx";

export default observer (
    function Route(props) {

        function deleteRouteACB(routeId){
            props.deleteRoute(routeId)
        }

        function setCurrentRouteACB(routeId) {
            props.setCurrentRoute(routeId)
        }

        return (
            <RouteView
                route={props.route}
                deleteRoute={deleteRouteACB}
                setCurrentRoute={setCurrentRouteACB}
            />
        );
    }
);