const TEMP_BASE_URL="https://api.sl.se/api2/realtimedeparturesV4.json?key={0}&siteid={1}&timewindow={2}";// the DH2642 proxy server
const API_KEY="0116d890a1d148ebba03726804fcddaa";

//const STATION_API_KEY="3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767";
const STATION_URL= "https://api.sl.se/api2/typeahead.json";


const STATION_API_KEY="7512fef5ae7e4ce0a2601a2a8adf706d";

// 0 = my API key
// 1 = SITEID
// 2 = Time Window


//Detta är en funktion som formaterar url med rätt parametrar
function formatString(template, ...values) {                            
    return template.replace(/{(\d+)}/g, (match, index) => values[index] || "");
  }
  


  //Parametrar
  const SITEID = 9192;
  const TimeWindow = 60;


  
//const BASE_URL = formatString(TEMP_BASE_URL, API_KEY, SITEID, TimeWindow );
const BASE_URL="https://api.sl.se/api2/realtimedeparturesV4.xml?key=0116d890a1d148ebba03726804fcddaa&siteid=9304&timewindow=60";// the DH2642 proxy server






export {BASE_URL, API_KEY, STATION_API_KEY, STATION_URL};