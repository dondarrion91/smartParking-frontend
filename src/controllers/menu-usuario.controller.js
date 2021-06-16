import view from "../views/menu-usuario.html";
import request from "../utils/request.class";
import { Cliente } from "../models/cliente.model";
import { Admin } from "../models/admin.model";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    request
        .getOne("usuarios", JSON.parse(localStorage.getItem("user")).id)
        .then((res) => {
            return res.json();
        })
        .then((dataUsuario) => {
            const rol = dataUsuario.admin ? "admin" : "usuario";
            divElement.querySelector("#usuario").innerHTML =
                dataUsuario.usuario;
            divElement.querySelector("#full-name").innerHTML =
                dataUsuario.nombreCompleto;
            divElement.querySelector("#dni").innerHTML = dataUsuario.dni;
            divElement.querySelector("#rol").innerHTML = rol;

            request
                .getOne("vehiculos", dataUsuario.vehiculo)
                .then((res) => {
                    return res.json();
                })
                .then((vehiculo) => {
                    divElement.querySelector("#patente").innerHTML =
                        vehiculo.patente;
                    divElement.querySelector("#marca").innerHTML =
                        vehiculo.marca;
                    divElement.querySelector("#modelo").innerHTML =
                        vehiculo.modelo;
                });

            dataUsuario.reservas.forEach((reserva) => {
                if (!reserva.reserva) {
                    return;
                }
                request
                    .getOne("lugares", reserva.reserva.lugar)
                    .then((res) => {
                        return res.json();
                    })
                    .then((lugar) => {
                        request
                            .getOne("usuarios", reserva.reserva.cliente)
                            .then((res) => res.json())
                            .then((usuarioReserva) => {
                                divElement.querySelector(
                                    "#reservas-list"
                                ).innerHTML += `
                                <div class="col-md-4">
                                <div class="card bg-primary" >
                                    <div class="card-body">
                                        <h5 class="card-title">Reserva ${
                                            lugar._id
                                        }</h5>
                                        <p class="card-text ${lugar.estado.toLowerCase()}">
                                            Estado: ${lugar.estado}
                                        </p>
        
                                        <p class="card-text">
                                            Tarifa: ${lugar.tarifa}
                                        </p>

                                        ${
                                            dataUsuario.admin
                                                ? `<p class="card-text"> Usuario: ${usuarioReserva.usuario} </p>`
                                                : ""
                                        }
        
                                        <p class="card-text">
                                            hora de ingreso: <strong>${new Date(
                                                reserva.reserva.horaIngreso
                                            )}</strong>
                                        </p>
        
                                        <p class="card-text">
                                            hora de ingreso: <strong>${new Date(
                                                reserva.reserva.horaSalida
                                            )}</strong>
                                        </p>
                    
                                        <p class="card-text">
                                            Monto reserva: ${
                                                reserva.reserva.montoReserva
                                            }
                                        </p>
                    
                                        <p class="card-text">
                                            Monto final: ${
                                                reserva.reserva.montoFinal
                                            }
                                        </p>
        
                                        <p class="card-text">
                                            Metodo de pago: ${
                                                reserva.reserva.metodoDePago
                                            }
                                        </p>
        
                                        <button class="btn btn-success" ${lugar.estado === "DISPONIBLE" ? "style='display:none;'" : ""} id='${
                                            lugar._id
                                        }'>${
                                    dataUsuario.admin
                                        ? "Cobrar Reserva"
                                        : "Pagar Reserva"
                                }</button>
        
                                        ${
                                            dataUsuario.admin
                                                ? "<button class='btn btn-danger'>Borrar reserva</button>"
                                                : ""
                                        }  
                                    </div>
                                </div>
                                </div>
                                `;
                            })
                            .finally(() => {
                                document
                                    .querySelectorAll(".btn-success")
                                    .forEach((button) => {
                                        button.addEventListener(
                                            "click",
                                            function (event) {
                                                const cliente = new Cliente();
                                                const admin = new Admin();

                                                if (rol !== "admin") {
                                                    cliente.pagarReserva(
                                                        event.target.id
                                                    );
                                                } else {
                                                    admin.pagarReserva(
                                                        event.target.id,
                                                        reserva.reserva._id
                                                    );
                                                }
                                            }
                                        );
                                    });
                            });
                    });
            });
        });

    return divElement;
};
