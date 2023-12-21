import {observer} from 'mobx-react-lite';

import EditRouteView from "/src/views/editRouteView.jsx";

export default observer (
    function EditRoute(props) {
        function saveMinCB(x){
            props.model.editRouteTime(x);
        }

        return (
            <EditRouteView
                location={props.model.getLocation()}
                currentRoute={props.model.getRoutePosition()}
                textMin={saveMinCB}
                model={props.model}
            />
        );
    }
);