import {observer} from 'mobx-react-lite';

import EditRouteView from "/src/views/editRouteView.jsx";

export default observer (
    function EditRoute(props) {
        return (
            <EditRouteView
                location={props.model.getLocation()}
                currentRoute={props.model.getRoutePosition()}
            />
        );
    }
);