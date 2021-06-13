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
}

module.exports = UsersStrategy;
