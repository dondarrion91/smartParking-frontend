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
                    "http://localhost:3000/api/v1/usuarios/" +
                        JSON.parse(localStorage.getItem("user")).id,
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
                        if (dataReservas._id) {
                            userData.reservas.push({
                                reserva: dataReservas._id,
                            });
                        } else {
                            alert("Error a crear la reserva");
                            window.location.hash = "/parking";
                            return;
                        }

                        fetch(
                            "http://localhost:3000/api/v1/usuarios/" +
                                JSON.parse(localStorage.getItem("user")).id,
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
const clienteStrategy = new ClienteStrategy();

class Cliente extends Usuarios {
    constructor(reservas, idUsuario, nombreCompleto, usuario, password, dni) {
        super(reservas, idUsuario, nombreCompleto, usuario, password, dni);
        this.admin = false;
    }

    crearReserva(reserva) {
        usuariosStrategy.strategy = clienteStrategy;
        usuariosStrategy.crearReserva(reserva);
    }

    pagarReserva(reserva) {
        usuariosStrategy.strategy = clienteStrategy;
        usuariosStrategy.pagarReserva(reserva);
    }
}

module.exports = Cliente;
