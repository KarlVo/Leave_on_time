import { observer } from 'mobx-react-lite';

import TestView from "../views/testView";

export default
observer(

    function Test(props){
        function firstCB(test){
            props.model.getStationDetails();
        }

        function searchStationID_CB(x){
            props.model.setCurrentStation();
        }

        return (
                <TestView 
                    stationTable={firstCB} textEntry={searchStationID_CB}
                
                /> 
        
        )

})