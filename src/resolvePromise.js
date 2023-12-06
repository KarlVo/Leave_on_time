// Path: src/resolvePromise.js

function resolvePromise(prms, promiseState) {
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;
  
    if (promiseState.promise !== null) {
      prms.then(successACB).catch(errorACB);
    }
  
    let firstMetroDisplayTime; // Declare the variable outside the if block
  
    function successACB(result) {
      if (promiseState.promise === prms) {
        const jsonObject = JSON.parse(result);
  
        // Check if there are metros in the array
        if (jsonObject.ResponseData.Metros.length > 0) {
          // Access the DisplayTime of the first Metro
          firstMetroDisplayTime = jsonObject.ResponseData.Metros[0].DisplayTime;
  
          // Log the DisplayTime
          console.log("First Metro DisplayTime:", firstMetroDisplayTime);
        } else {
          console.log("No Metros available.");
        }
  
        // Assign the value to promiseState.data
        promiseState.data = firstMetroDisplayTime;
      }
    }
  
    function errorACB(error) {
      if (promiseState.promise === prms) {
        console.log("ad är det här", error);
        promiseState.error = error;
      }
    }
  }
  
  export default resolvePromise;
  