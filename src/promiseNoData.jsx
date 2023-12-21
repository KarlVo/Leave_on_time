export default function promiseNoData(promise, data, error) {
    if (promise === null || promise === undefined) {
        return (<div>No data...</div>);
    }
    
    if (error !== null) {
        return (<div>{error}</div>);
    }

    if (data === undefined) {
        return (<div className='progress'></div>);
    }

    return false;
}