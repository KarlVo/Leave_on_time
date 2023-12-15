

function promiseNoData(promise, data, error) {
    if (promise === null || promise === undefined){
        console.log("no data")
        return <span>no data</span>
    }
  
   if (error){
       console.log("varför kommer jag in här")
        return //<span>{props.model.stationDetailsPromiseState.error}</span>
    
    } 
  
  
   if (!data){
       return (<div className="progressContainer"><div className="progress"></div></div>);
   }
   return false;
}