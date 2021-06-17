const { Usuarios } = require("../models/usuarios.model");
const UsuariosStrategy = require("../interfaces/UsersStrategy.interface");
import ESTADO from "../enums/estados.enum";
import request from "../utils/request.class";

class AdminStrategy {
    pagarReserva(lugarId, reservaId) {
        request
            .put("lugares", lugarId, {
                estado: ESTADO.DISPONIBLE,
            })
            .then((res) => res.json())
            .then((message) => {
                request
                    .delete("reservas", reservaId)
                    .then((res) => res.json())
                    .then((message) => {
                        window.location.reload();
                    })
                    .catch((error) => alert(error));
            })
            .catch((error) => alert(error));
    }

    borrarReserva(reservaId, lugarId) {        
        return request.delete("reservas", reservaId)
            .then(res => res.json())
            .then(message => {
                request.put("lugares", lugarId, {
                    estado: "DISPONIBLE"
                })
                    .then(res => {
                        console.log(res)
                        return res.json()
                    })                                  
            })
    }
}

const usuariosStrategy = new UsuariosStrategy();
const adminStrategy = new AdminStrategy();

class Admin extends Usuarios {
    constructor(reservas, idUsuario, nombreCompleto, usuario, dni, admin) {
        super(reservas, idUsuario, nombreCompleto, usuario, dni, admin);
    }

    crearReserva(reserva) {
        usuariosStrategy.strategy = adminStrategy;
        usuariosStrategy.crearReserva(reserva);
    }

    agregarReserva(reserva) {
        usuariosStrategy.strategy = adminStrategy;
        usuariosStrategy.agregarReserva(reserva);
    }

    pagarReserva(lugarId, reservaId) {
        usuariosStrategy.strategy = adminStrategy;
        usuariosStrategy.pagarReserva(lugarId, reservaId);
    }

    borrarReserva(reservaId, lugarId) {
        usuariosStrategy.strategy = adminStrategy;
        usuariosStrategy.borrarReserva(reservaId, lugarId);
    }
}

export { Admin };
