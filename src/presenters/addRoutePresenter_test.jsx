import {observer} from 'mobx-react-lite';

import AddRouteView from "/src/views/addRouteView.jsx";

export default observer (
    function AddRoute(props) {



        let object = {name: null, towards: null, line: null, min: null, ID: null, X:null, Y:null}


        function firstCB(test){
            props.model.getStationDetails();
        }

        function saveStationName_CB(x){
            //props.model.setCurrentStation();
            //save to object
            object.name = x;
        }

        function saveTowards_CB(x){
            //save to object
            object.towards = x;
        }

        function saveLine_CB(x){
            //save to object
            object.line = x;
        }

        function saveMin_CB(x){
                //save to object
            object.min = x;
        }
        function submitModelInfoCB(info){
            console.log("submitMOdelinFO");
            props.model.setCurrentStation(object.name);


            if (props.model.stationIDPromiseState.promise === null || props.model.stationIDPromiseState.promise === undefined){
               
                return <span>no data</span>
            }
          
           if (props.model.stationIDPromiseState.error){
               console.log("varför kommer jag in här")
                return //<span>{props.model.stationDetailsPromiseState.error}</span>
            
            } 
          
          
           if (!props.model.stationIDPromiseState.data){
               return (<div className="progressContainer"><div className="progress"></div></div>);
           }
           console.log("härdå")
          

            object.ID = props.model.stationIDPromiseState.data.stationID;
            object.X = props.model.stationIDPromiseState.data.stationX;
            object.Y = props.model.stationIDPromiseState.data.stationY;
            props.model.stations.push(object);
            console.log("stationer:", props.model.stations)
        }





        return (
            <AddRouteView
                location={props.model.getLocation()}



                textStation={saveStationName_CB}
                textTowards={saveTowards_CB}
                textLine={saveLine_CB}
                textMin={saveMin_CB}

                submitEvent={submitModelInfoCB}





            />
        );
    }
);