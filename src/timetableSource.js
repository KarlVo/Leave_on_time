import {BASE_URL, STATION_API_KEY, STATION_URL} from "./apiConfig"

//headers:{'Access-Control-Allow-Origin':'http://127.0.0.1:8080', 'Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Allow, Authortization'  }
//ny kod
export function getTimeDetails(){
    console.log("vad är url", BASE_URL);
    return fetch(BASE_URL, {method: 'GET' }).then(responseACB).then(filterACB)

}


function filterACB(resp){
    let firstMetroDisplayTime; // Declare the variable outside the if block

    const jsonObject = JSON.parse(resp);
  
    // Check if there are metros in the array
    if (jsonObject.ResponseData.Metros.length > 0) {
      // Access the DisplayTime of the first Metro
      firstMetroDisplayTime = jsonObject.ResponseData.Metros[0].DisplayTime;

      // Log the DisplayTime
      console.log("First Metro DisplayTime:", firstMetroDisplayTime);
    } else {
      console.log("No Metros available.");
    }

    return firstMetroDisplayTime
}

function arrayObjACB(ar){
    console.log("arr is: ", ar);
    return ar[0];
}

function responseACB(resp){
    if (!resp.ok){
        throw new Error('resp not 200');
    }
    //else{

    console.log("resp is: ", resp);
    return resp.text();
    //}  
    //return resp.text;
}

function keepArrayACB(res){
    //console.log("e");
    //console.log(res);
    //console.log("r");
    return res.results;
}

export function getStationID(stationName, boolParam, maxResults){
    
    const url = `${STATION_URL}?key=${STATION_API_KEY}&searchstring=${stationName}&stationsonly=${boolParam}&maxresults=${maxResults}`;
    //modify base url to get data for whole array of ids
    //const param= array_of_dish_ids.join(',');
    //const url = BASE_URL+"recipes/informationBulk";
    //const url2 = `${url}?ids=${param}`;
    //const url = `${BASE_URL}informationbulk?ids=456%2C987%2C321`;
    console.log("KALLE url is: ", url); 
    return fetch(url, {
        method: 'GET',
        //headers:{'X-Mashape-Key': API_KEY},
    }).then(responseACB).then(filterID_ACB);
}


function filterID_ACB(resp){
    let stationID;
    let stationX;
    let stationY;
    let test;
    const jsonObject = JSON.parse(resp);
    //test = jsonObject.ResponseData[0];
    //

    stationID = jsonObject.ResponseData[0].SiteId;
    stationX = jsonObject.ResponseData[0].X;
    stationY = jsonObject.ResponseData[0].Y;
    console.log("har vi kommit hitrå")
    return {
        stationID: stationID,
        stationX: stationX,
        stationY: stationY
    };
    // console.log(stationID);
    // console.log(stationX);
    // console.log(stationY);

}