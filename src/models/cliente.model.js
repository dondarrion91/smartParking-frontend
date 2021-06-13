const Usuarios = require("../models/usuarios.model");
const UsuariosStrategy = require("../interfaces/UsersStrategy.interface");

class ClienteStrategy {
    crearReserva(reserva) {
        fetch("http://localhost:3000/api/v1/reservas", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(reserva),
        }).then((res) => {
            if (res.status !== 200) {
                alert("Error a crear la reserva");
            } else {
                alert("Reserva creada con exito");
            }
        });
    }
}

const usuariosStrategy = new UsuariosStrategy();
const clienteStrategy = new ClienteStrategy();

class Cliente extends Usuarios {
    constructor(reservas, idUsuario, nombreCompleto, usuario, dni) {
        super(reservas, idUsuario, nombreCompleto, usuario, dni);
    }

    crearReserva(reserva) {
        usuariosStrategy.strategy = clienteStrategy;
        usuariosStrategy.crearReserva(reserva);
    }
}

module.exports = Cliente;
