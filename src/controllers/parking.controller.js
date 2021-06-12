import Lugar from "../models/lugar.model";
import view from "../views/parking.html";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    fetch("http://localhost:3000/api/v1/lugares", {
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            data.forEach((element, index) => {
                const lugar = new Lugar(element.estado, element.tarifa);

                divElement.querySelector(".row").innerHTML += `
                <div class="col-2">
                    <div class="lugar ${element.estado.toLowerCase()}">
                        <span>${index + 1}</span>
                        <p class="tarifa">Tarifa: ${element.tarifa}</p>
                        <p class="estado">${element.estado}</p>
                    </div>
                </div>
            `;
            });
        });

    return divElement;
};
