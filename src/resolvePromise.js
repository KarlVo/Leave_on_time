// Path: src/resolvePromise.js

function resolvePromise(prms, promiseState) {
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;
  
    if (promiseState.promise !== null) {
      prms.then(successACB).catch(errorACB);
    }
  
  
    function successACB(result) {
      if (promiseState.promise === prms) {
        
  
        // Assign the value to promiseState.data
        //console.log("vi kollar resultat", result)
        promiseState.data = result;
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
  