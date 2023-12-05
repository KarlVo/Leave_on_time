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

        function openAddRouteCB(){
            //
        }

        return (
                <TestView 
                    stationTable={firstCB} textEntry={searchStationID_CB} openAddRoute={openAddRouteCB}
                
                /> 
        
        )

})