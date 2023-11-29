import { BASE_URL, API_KEY } from "./apiConfig"


function arrayObjACB(ar){
    console.log("arr is: ", ar);
    return ar[0];
}

function responseACB(resp){
    if (!resp.ok){
        throw new Error('resp not 200');
    }
    //else{

    //console.log("w")
    return resp.json(); 
    //}  
    //return resp.text;
}

function keepArrayACB(res){
    //console.log("e");
    //console.log(res);
    //console.log("r");
    return res.results;
}

export function getMenuDetails(array_of_dish_ids){
    //modify base url to get data for whole array of ids
    const param= array_of_dish_ids.join(',');
    const url = BASE_URL+"recipes/informationBulk";
    const url2 = `${url}?ids=${param}`;
    //const url = `${BASE_URL}informationbulk?ids=456%2C987%2C321`;
    console.log("url2 is: ", url2); 
    return fetch(url2, {
        method: 'GET',
        headers:{'X-Mashape-Key': API_KEY},
    }).then(responseACB);
}
export function getDishDetails(id) {

    const x = [id];
    

    return getMenuDetails(x).then(arrayObjACB)

}
export function searchDishes(searchParams){
    //const param = searchParams.query;
    const param = new URLSearchParams(searchParams);   //Använder den här funktionen för att göra om sökningen till en riktig URL
    const url = BASE_URL+"recipes/complexSearch"
    const url2 = `${url}?${param}`
    return fetch(url2, {
        method: 'GET',
        headers:{'X-Mashape-Key': API_KEY},
    }).then(responseACB).then(keepArrayACB);
}