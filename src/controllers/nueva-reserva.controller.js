import Reservas from "../models/reserva.model";
<<<<<<< HEAD
import Cliente from "../models/cliente.model";
import Admin from "../models/admin.model";
import view from "../views/nueva-reserva.html";
import observer from "../interfaces/ReservasObserver.interface";
=======
import { Usuarios } from "../models/usuarios.model";
import view from "../views/nueva-reserva.html";
import { observer } from "../interfaces/ReservasObserver.interface";
import request from "../utils/request.class";
>>>>>>> master

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    const datosCliente = JSON.parse(localStorage.getItem("user"));

<<<<<<< HEAD
    fetch("http://localhost:3000/api/v1/usuarios", {
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
=======
    request
        .getAll("usuarios")
>>>>>>> master
        .then((res) => {
            return res.json();
        })
        .then((users) => {
            users.forEach((user) => {
                divElement.querySelector("#usuario").innerHTML += `
                                <option value="${user._id}">${user.usuario}</option>
                            `;
            });

            if (datosCliente.admin) {
                divElement.querySelector("#usuario-select").style.display =
                    "block";
            } else {
                divElement.querySelector("#usuario-select").style.display =
                    "none";
            }
        });

    divElement
        .querySelector("#crear-reserva")
        .addEventListener("click", function (event) {
            event.preventDefault();
            let usuario = null;
            let userId;

            if (datosCliente.admin) {
<<<<<<< HEAD
                usuario = new Admin.Admin();
                userId = divElement.querySelector("#usuario").value;
            } else {
                usuario = new Cliente();
=======
                usuario = new Usuarios();
                userId = divElement.querySelector("#usuario").value;
            } else {
                usuario = new Usuarios();
>>>>>>> master
                userId = JSON.parse(localStorage.getItem("user")).id;
            }

            const nuevaReserva = new Reservas(
                JSON.parse(localStorage.getItem("lugar")).id,
                divElement.querySelector("#horaIngreso").value,
                divElement.querySelector("#horaSalida").value,
                userId,
                JSON.parse(localStorage.getItem("lugar")).tarifa,
                divElement.querySelector("#monto").value
            );

            nuevaReserva.calcularMonto(nuevaReserva);

            nuevaReserva.metodoDePago =
                divElement.querySelector("#metodoPago").value;

<<<<<<< HEAD
            usuario.crearReserva(nuevaReserva);

            fetch("http://localhost:3000/api/v1/usuarios?admin=true", {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
=======
            usuario.crearReserva(nuevaReserva, userId);

            request
                .getAll("usuarios?admin=true")
>>>>>>> master
                .then((res) => {
                    return res.json();
                })
                .then((usuarioData) => {
<<<<<<< HEAD
                    if (usuarioData) {
                        usuarioData.reservas.push({
                            reserva: nuevaReserva._id,
                        });

                        fetch(
                            "http://localhost:3000/api/v1/usuarios/" +
                                usuarioData,
                            {
                                method: "PUT",
                                headers: {
                                    Accept: "application/json, text/plain, */*",
                                    "Content-Type": "application/json",
                                },
                                credentials: "include",
                                body: JSON.stringify(
                                    usuarioData.reservas.reservas
                                ),
                            }
                        )
                            .then((res) => {
                                return res.json();
                            })
                            .then((data) => {
                                console.log(data);
                            });
=======
                    if (usuarioData._id) {
                        // Guardamos la reserva en el usuario admin
                        usuario.crearReserva(nuevaReserva, usuarioData._id);
>>>>>>> master
                    }

                    observer.suscribe({
                        body: nuevaReserva,
                        context: "lugar",
                        model: "lugares",
                        data: { estado: "RESERVADO" },
                    });

                    observer.actualizar();
                });
        });

    return divElement;
};
