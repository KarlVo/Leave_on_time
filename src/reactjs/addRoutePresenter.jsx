import { observer } from 'mobx-react-lite';

import AddRouteView from "../views/addRouteView.jsx";

export default
observer(

    function addRoute(props){
        function firstCB(test){
            props.model.getStationDetails();
        }

        function searchStationID_CB(x){
            props.model.setCurrentStation();
        }

        return (
                <AddRouteView 
                    textEntry={searchStationID_CB}
                
                /> 
        
        )

})