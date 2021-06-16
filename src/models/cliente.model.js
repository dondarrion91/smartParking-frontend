const { Usuarios } = require("../models/usuarios.model");
const UsuariosStrategy = require("../interfaces/UsersStrategy.interface");
import ESTADO from "../enums/estados.enum";
import request from "../utils/request.class";

class ClienteStrategy {
    pagarReserva(id) {
        request
            .put("lugares", id, {
                estado: ESTADO.PAGADO,
            })
            .then((res) => res.json())
            .then((message) => window.location.reload());
    }
}

const usuariosStrategy = new UsuariosStrategy();
const clienteStrategy = new ClienteStrategy();

class Cliente extends Usuarios {
    constructor(reservas, idUsuario, nombreCompleto, usuario, password, dni) {
        super(reservas, idUsuario, nombreCompleto, usuario, password, dni);
        this.admin = false;
    }

    pagarReserva(id) {
        usuariosStrategy.strategy = clienteStrategy;
        usuariosStrategy.pagarReserva(id);
    }
}

export { Cliente };
