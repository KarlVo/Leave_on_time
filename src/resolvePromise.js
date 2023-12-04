// Path: src/resolvePromise.js

function resolvePromise(prms, promiseState) {
  promiseState.promise = prms;
  promiseState.data = null;
  promiseState.error = null;

  if (promiseState.promise !== null) {
    prms.then(successACB).catch(errorACB);
  }
  //}

  function successACB(result) {
    if (promiseState.promise === prms) {
        //console.log("kommerjaghit11111?")
        const jsonObject = JSON.parse(result);
        //console.log("test", jsonObject.ResponseData.Metros)
      //const metrosArray = jsonData.result.Metros; //kollar 
      //console.log("kommerjaghit?", metrosArray)

      // Check if there are metros in the array
      if (jsonObject.ResponseData.Metros.length > 0) {
        // Access the DisplayTime of the first Metro
        const firstMetroDisplayTime = jsonObject.ResponseData.Metros[0].DisplayTime;

        // Log the DisplayTime
        console.log("First Metro DisplayTime:", firstMetroDisplayTime);
      } else {
        console.log("No Metros available.");
      }

      //console.log("kommer jag in i promise state", result);
      

      promiseState.data = result;
    }
  }

  function errorACB(error) {
    if (promiseState.promise === prms) {
      promiseState.error = error;
    }
  }

  //if (promiseState.prms === promise){
  //   successACB(prms);
  //}
}

export default resolvePromise;
