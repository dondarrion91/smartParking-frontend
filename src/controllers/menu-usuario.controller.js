import view from "../views/menu-usuario.html";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

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
        .then((data) => {
            const rol = data.admin ? "admin" : "usuario";

            divElement.querySelector("#usuario").innerHTML = data.usuario;
            divElement.querySelector("#full-name").innerHTML =
                data.nombreCompleto;
            divElement.querySelector("#dni").innerHTML = data.dni;
            divElement.querySelector("#rol").innerHTML = rol;

            data.reservas.forEach((reserva) => {
                fetch(
                    "http://localhost:3000/api/v1/lugares/" +
                        JSON.parse(localStorage.getItem("lugar")).id,
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
                    .then((lugar) => {
                        divElement.querySelector(
                            "#reservas-list"
                        ).innerHTML += `
                        <div class="col-md-4">
                        <div class="card bg-primary" >
                            <div class="card-body">
                                <h5 class="card-title">Reserva ${lugar._id}</h5>
                                <p class="card-text ${lugar.estado.toLowerCase()}">
                                    Estado: ${lugar.estado}
                                </p>

                                <p class="card-text">
                                    Tarifa: ${lugar.tarifa}
                                </p>

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
                                    Monto final: ${reserva.reserva.montoFinal}
                                </p>

                                <button class="btn btn-success">Pagar reserva</button>
                            </div>
                        </div>
                    </div>
                        `;
                    });
            });
        });

    return divElement;
};