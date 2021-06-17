import view from "../views/menu-usuario.html";
import request from "../utils/request.class";
import { Cliente } from "../models/cliente.model";
import { Admin } from "../models/admin.model";
import { observer } from "../interfaces/ReservasObserver.interface";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    setInterval(() => {     
        const cards = divElement.querySelectorAll(".card-body");

        divElement.querySelector("#hour").innerText = new Date().getHours();
        divElement.querySelector("#minutes").innerText = new Date().getMinutes();
        divElement.querySelector("#seconds").innerText = new Date().getSeconds();   

        for (let i = 0; i < cards.length; i += 1) {                       
            const horaDeIngresoEl = divElement.querySelector("#hora-ingreso-" + i);
            const horaDeSalidaEl = divElement.querySelector("#hora-salida-" + i);
            const lugarEstadoEl = divElement.querySelector("#lugar-estado-" + i);
            const reservaIdEl = divElement.querySelector("#reserva-" + i);

            if (lugarEstadoEl.innerText.toLowerCase() === "ocupado") {
                return;
            }

            if (horaDeSalidaEl) {
                if (new Date() < new Date(horaDeSalidaEl.innerText) && new Date() > new Date(horaDeIngresoEl.innerText) ) {
                    observer.suscribe({
                        body: {
                            lugar: reservaIdEl.innerText
                        },
                        context: "lugar",
                        model: "lugares",
                        data: { estado: "OCUPADO" },
                    });

                    observer.actualizar();
                };
            }
        }         
    }, 1000);

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

            dataUsuario.reservas.forEach((reserva, index) => {    
                const idFechaIngreso = `id="hora-ingreso-${index}"`;
                const idFechaSalida = `id="hora-salida-${index}"`;                            
                const idLugarEstado = `id="lugar-estado-${index}"`;  
                const reservaId = `id="reserva-${index}"`;
                
                if (!reserva.reserva) {
                    divElement.querySelector(
                        "#reservas-list"
                    ).innerHTML += `
                    <p class="card-text" style="display:none;" ${idFechaIngreso}>                    
                </p>

                <p class="card-text" style="display:none;" ${idFechaSalida} >
                    
                </p>  
                    `

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
                                        <p class="card-title h5">Reserva <span ${reservaId}>${
                                            lugar._id
                                        }</span></p>

                                        <p class="card-text ${lugar.estado.toLowerCase()}">
                                            Estado: <span ${idLugarEstado}>${lugar.estado}</span> 
                                        </p>
        
                                        <p class="card-text">
                                            Tarifa por hora: $ ${lugar.tarifa}
                                        </p>

                                        ${
                                            dataUsuario.admin
                                                ? `<p class="card-text"> Usuario: ${usuarioReserva.usuario} </p>`
                                                : ""
                                        }
        
                                        <p class="card-text"  ${idFechaIngreso}>
                                            Hora de ingreso: <strong>${new Date(
                                                reserva.reserva.horaIngreso
                                            )}</strong>
                                        </p>
        
                                        <p class="card-text" ${idFechaSalida} >
                                            Hora de salida: <strong>${new Date(
                                                reserva.reserva.horaSalida
                                            )}</strong>
                                        </p>                                                        
                    
                                        <p class="card-text">
                                            Monto final: $ ${
                                                reserva.reserva.montoFinal
                                            }
                                        </p>
        
                                        <p class="card-text">
                                            Metodo de pago: ${
                                                reserva.reserva.metodoDePago
                                            }
                                        </p>                                        
        
                                        <button class="btn btn-success" ${(lugar.estado === "DISPONIBLE" || lugar.estado === "PAGADO") & dataUsuario.admin !== true ? "style='display:none;'" : ""} id='${
                                            lugar._id
                                        }'>${
                                    dataUsuario.admin
                                        ? "Cobrar Reserva"
                                        : "Pagar Reserva"
                                }</button>
        
                                        ${
                                            dataUsuario.admin
                                                ? `<button ${lugar.estado === "DISPONIBLE" || lugar.estado === "PAGADO" ? "style='display:none;'" : ""} id='${
                                                    reserva.reserva._id
                                                }' class='btn btn-danger'>Borrar reserva</button>`
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

                                document
                                    .querySelectorAll(".btn-danger")
                                    .forEach((button) => {
                                        button.addEventListener(
                                            "click",
                                            function (event) {                                                                                            
                                                const admin = new Admin();
                                                admin.borrarReserva(event.target.id);                                                
                                            }
                                        );
                                    });
                            });
                    });
            });
        });

    return divElement;
};
