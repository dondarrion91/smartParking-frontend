class UsersStrategy {
    constructor() {
        this._strategy = null;
    }

    set strategy(strategy) {
        this._strategy = strategy;
    }

    get strategy() {
        return this._strategy;
    }

    crearReserva(context) {
        this._strategy.crearReserva(context);
    }

    calcularMonto(context) {
        return this._strategy.calcularMonto(context);
    }

<<<<<<< HEAD
    pagarReserva(context) {
        return this._strategy.calcularMonto(context);
=======
    pagarReserva(context1, context2) {
        return this._strategy.pagarReserva(context1, context2);
>>>>>>> master
    }

    agregarReserva(context) {
        return this._strategy.agregarReserva(context);
    }
}

module.exports = UsersStrategy;
