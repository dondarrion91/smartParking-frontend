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
}

export default {
    Admin,
};
