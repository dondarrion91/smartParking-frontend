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

    pagarReserva(context1, context2) {
        return this._strategy.pagarReserva(context1, context2);
    }

    agregarReserva(context) {
        return this._strategy.agregarReserva(context);
    }

    borrarReserva(context1, context2) {
        return this._strategy.borrarReserva(context1, context2);
    }
}

module.exports = UsersStrategy;
