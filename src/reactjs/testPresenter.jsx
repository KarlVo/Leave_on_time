import { observer } from 'mobx-react-lite';

import TestView from "../views/testView";

export default
observer(

    function Test(props){
        function firstCB(test){
            props.model.getStationDetails();
        }


        return (
                <TestView 
                    stationTable={firstCB}
                
                /> 
        
        )

})