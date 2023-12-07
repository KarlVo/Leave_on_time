import { observer } from 'mobx-react-lite';

import TestView from "../views/testView";
import SearchResultsView from "../views/searchResultsView";

export default
observer(

    function Test(props){

        function renderSearchResult(){
            //console.log("new case");
            //console.log("promise", props.model.stationDetailsPromiseState.promise);
            //console.log("data", props.model.stationDetailsPromiseState.data);
            //console.log("error", props.model.stationDetailsPromiseState.error);
            if (props.model.stationDetailsPromiseState.promise === null || props.model.stationDetailsPromiseState.promise === undefined){
               
                 return <span>no data</span>
             }
           
            if (props.model.stationDetailsPromiseState.error){
                console.log("varför kommer jag in här")
                 return //<span>{props.model.stationDetailsPromiseState.error}</span>
             
             } 
           
           
            if (!props.model.stationDetailsPromiseState.data){
                return (<div className="progressContainer"><div className="progress"></div></div>);
            }
            console.log("härdå")
            return (
                   
                    <SearchResultsView 
                        searchResults={props.model.stationDetailsPromiseState.data} 
                    />
            )
        }




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
            <div>
                <TestView 
                    stationTable={firstCB} 
                    textEntry={searchStationID_CB} 
                    openAddRoute={openAddRouteCB}
                /> 
                {renderSearchResult()}
            </div>
        )

})