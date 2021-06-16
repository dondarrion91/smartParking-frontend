import Reservas from "../models/reserva.model";
import { Usuarios } from "../models/usuarios.model";
import view from "../views/nueva-reserva.html";
import { observer } from "../interfaces/ReservasObserver.interface";
import request from "../utils/request.class";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    const datosCliente = JSON.parse(localStorage.getItem("user"));

    request
        .getAll("usuarios")
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
                usuario = new Usuarios();
                userId = divElement.querySelector("#usuario").value;
            } else {
                usuario = new Usuarios();
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

            usuario.crearReserva(nuevaReserva, userId);

            request
                .getAll("usuarios?admin=true")
                .then((res) => {
                    return res.json();
                })
                .then((usuarioData) => {
                    if (usuarioData._id) {
                        // Guardamos la reserva en el usuario admin
                        usuario.crearReserva(nuevaReserva, usuarioData._id);
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
