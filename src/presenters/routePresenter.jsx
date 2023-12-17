import {observer} from 'mobx-react-lite';

import RouteView from "/src/views/routeView.jsx";

export default observer (
    function Route(props) {
        return (
            <RouteView
                route={props.route}
            />
        );
    }
);