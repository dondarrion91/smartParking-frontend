const UsuariosStrategy = require("../interfaces/UsersStrategy.interface");

class ReservaStrategy {
    calcularMonto(reserva) {
        const horaIngreso = new Date(reserva.horaIngreso);
        const horaSalida = new Date(reserva.horaSalida);

        const milliseconds = Math.abs(horaSalida - horaIngreso);
        const hours = milliseconds / 36e5;

        return (
            parseInt(reserva.montoReserva) + parseInt(reserva.tarifa) * hours
        );
    }
}

const usuariosStrategy = new UsuariosStrategy();
const reservaStrategy = new ReservaStrategy();

class Reservas {
    constructor(
        lugar,
        horaIngreso,
        horaSalida,
        cliente,
        tarifa,
        montoReserva,
        montoFinal,
        metodoDePago
    ) {
        this.lugar = lugar;
        this.horaIngreso = horaIngreso;
        this.horaSalida = horaSalida;
        this.cliente = cliente;
        this.tarifa = tarifa;
        this.montoReserva = montoReserva;
        this.montoFinal = montoFinal;
        this.metodoDePago = metodoDePago;
    }

    calcularMonto(reserva) {
        usuariosStrategy.strategy = reservaStrategy;
        this.montoFinal = usuariosStrategy.calcularMonto(reserva);
    }
}

module.exports = Reservas;
