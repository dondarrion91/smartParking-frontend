<<<<<<< HEAD
import Usuarios from "../models/usuarios.model";
const UsuariosStrategy = require("../interfaces/UsersStrategy.interface");

class AdminStrategy {
    crearReserva(reserva) {
        fetch("http://localhost:3000/api/v1/reservas", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(reserva),
        })
            .then((res) => {
                if (res.status !== 200) {
                    alert("Error a crear la reserva");
                    window.location.hash = "/#/parking";
                    return;
                } else {
                    return res.json();
                }
            })
            .then((dataReservas) => {
                fetch(
                    "http://localhost:3000/api/v1/usuarios/" + reserva.cliente,
                    {
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    }
                )
                    .then((res) => {
                        return res.json();
                    })
                    .then((userData) => {
                        userData.reservas.push({
                            reserva: dataReservas._id,
                        });

                        fetch(
                            "http://localhost:3000/api/v1/usuarios/" +
                                reserva.cliente,
                            {
                                method: "PUT",
                                headers: {
                                    Accept: "application/json, text/plain, */*",
                                    "Content-Type": "application/json",
                                },
                                credentials: "include",
                                body: JSON.stringify({
                                    reservas: userData.reservas,
                                }),
                            }
                        ).then((res) => {
                            if (res.status !== 200) {
                                alert("Error a crear la reserva");
                                window.location.hash = "/parking";
                            } else {
                                alert("Reserva creada con exito");
                                window.location.hash = "/menu-usuario";
                            }
                        });
                    });
            });
=======
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
>>>>>>> master
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
<<<<<<< HEAD
}

export default {
    Admin,
};
=======

    pagarReserva(lugarId, reservaId) {
        usuariosStrategy.strategy = adminStrategy;
        usuariosStrategy.pagarReserva(lugarId, reservaId);
    }
}

export { Admin };
>>>>>>> master
