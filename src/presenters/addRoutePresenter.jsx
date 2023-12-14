import {observer} from 'mobx-react-lite';

import AddRouteView from "/src/views/addRouteView.jsx";

export default observer (
    function AddRoute(props) {
        return (
            <AddRouteView
                location={props.model.getLocation()}
            />
        );
    }
);