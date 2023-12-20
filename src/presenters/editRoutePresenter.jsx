import {observer} from 'mobx-react-lite';

import EditRouteView from "/src/views/editRouteView.jsx";

export default observer (
    function EditRoute(props) {

            function saveMin_CB(x){
                props.model.editRouteTime(x);
            }
        return (

            <EditRouteView
                location={props.model.getLocation()}            //current location
                currentRoute={props.model.getRoutePosition()}
                textMin={saveMin_CB}
                model={props.model}

            />
        );
    }
);