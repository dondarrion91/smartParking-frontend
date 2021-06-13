class Lugar {
    constructor(id, estado, tarifa) {
        this.id = id;
        this.estado = estado;
        this.tarifa = tarifa;
    }

    actualizar(lugar) {
        this.estado = lugar.estado;
    }
}

module.exports = Lugar;
