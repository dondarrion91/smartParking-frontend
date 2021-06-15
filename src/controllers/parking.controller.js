<<<<<<< HEAD
import Lugar from "../models/lugar.model";
import view from "../views/parking.html";
=======
import view from "../views/parking.html";
import request from "../utils/request.class";
>>>>>>> master

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    divElement
        .querySelector("#mis-reservas")
        .addEventListener("click", function () {
            window.location.hash = "#/menu-usuario";
        });

<<<<<<< HEAD
    fetch("http://localhost:3000/api/v1/lugares", {
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
=======
    request
        .getAll("lugares")
>>>>>>> master
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.message === "Authentication Error") {
                window.location.hash = "#/login";
                return;
            }
            data.forEach((element, index) => {
<<<<<<< HEAD
                const lugar = new Lugar(
                    element._id,
                    element.estado,
                    element.tarifa
                );

                const isDisponible = element.estado === "DISPONIBLE";

=======
>>>>>>> master
                divElement.querySelector(".row").innerHTML += `
                <div class="col-2">
                    <div class="lugar pointer ${element.estado.toLowerCase()}">
                        <span>${index + 1}</span>          
                        <span id="_id" style="display: none">${
                            element._id
                        }</span>              
                        <p class="tarifa">Tarifa: ${element.tarifa}</p>
                        <p class="estado">${element.estado}</p>
                    </div>
                </div>
            `;
            });

            const disponibles = divElement.querySelectorAll(".disponible");
            const ocupados = divElement.querySelectorAll(".ocupado");

            for (let i = 0; i < disponibles.length; i++) {
                disponibles[i].addEventListener("click", function (event) {
                    if (!event.target.querySelector("#_id")) {
                        return;
                    }
                    localStorage.setItem(
                        "lugar",
                        JSON.stringify({
                            id: event.target.querySelector("#_id").innerHTML,
                            tarifa: event.target
                                .querySelector(".tarifa")
                                .innerHTML.split(" ")[1],
                        })
                    );
                    window.location.hash = "#/nueva-reserva";
                });
            }

            for (let i = 0; i < ocupados.length; i++) {
                ocupados[i].addEventListener("click", function (event) {
                    alert("Lugar no disponible, por favor elija otro");
                });
            }
        });

    return divElement;
};
