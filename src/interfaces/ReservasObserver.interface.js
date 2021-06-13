class Observer {
    constructor(observables) {
        this._observables = observables;
    }

    suscribe(newObservable) {
        this._observables.push(newObservable);
    }

    actualizar() {
        this._observables.forEach((observable) => {
            fetch(
                "http://localhost:3000/api/v1/" +
                    observable.model +
                    "/" +
                    observable.body[observable.context],
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json, text/plain, */*",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(observable.data),
                }
            ).then((res) => {
                console.log(res);
            });
        });
    }
}

const observer = new Observer([]);

module.exports = observer;
