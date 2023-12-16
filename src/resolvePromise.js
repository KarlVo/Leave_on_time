export default function resolvePromise(prms, promiseState) {
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    if (prms !== null) {
        prms.then(successACB).catch(errorACB);
    }

    function successACB(result) {
        if (promiseState.promise === prms) {
            promiseState.data = result;
        }
    }

    function errorACB(error) {
        if (promiseState.promise === prms) {
            promiseState.error = error;
            console.error(error);
        }
    }
}