import request from "../utils/request.class";

class Observer {
    constructor(observables) {
        this._observables = observables;
    }

    suscribe(newObservable) {
        this._observables.push(newObservable);
    }

    actualizar() {
        this._observables.forEach((observable) => {            
            request
                .put(
                    observable.model,
                    observable.body[observable.context],
                    observable.data
                )
                .then((res) => {
                    console.log(res);
                });
        });
    }
}

const observer = new Observer([]);

export { observer };
