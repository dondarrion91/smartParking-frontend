import Reservas from "../models/reserva.model";
import Cliente from "../models/cliente.model";
import Admin from "../models/admin.model";
import view from "../views/nueva-reserva.html";
import observer from "../interfaces/ReservasObserver.interface";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    const datosCliente = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:3000/api/v1/usuarios", {
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
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
                usuario = new Admin.Admin();
                userId = divElement.querySelector("#usuario").value;
            } else {
                usuario = new Cliente();
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

            usuario.crearReserva(nuevaReserva);

            fetch("http://localhost:3000/api/v1/usuarios?admin=true", {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
                .then((res) => {
                    return res.json();
                })
                .then((usuarioData) => {
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
