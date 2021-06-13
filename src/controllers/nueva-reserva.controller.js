import Reservas from "../models/reserva.model";
import Cliente from "../models/cliente.model";
import view from "../views/nueva-reserva.html";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    divElement
        .querySelector("#crear-reserva")
        .addEventListener("click", function (event) {
            event.preventDefault();
            const datosCliente = JSON.parse(localStorage.getItem("user"));
            const cliente = new Cliente();

            const nuevaReserva = new Reservas(
                JSON.parse(localStorage.getItem("lugar")).id,
                divElement.querySelector("#horaIngreso").value,
                divElement.querySelector("#horaSalida").value,
                JSON.parse(localStorage.getItem("user")).id,
                JSON.parse(localStorage.getItem("lugar")).tarifa,
                divElement.querySelector("#monto").value
            );

            nuevaReserva.calcularMonto(nuevaReserva);

            nuevaReserva.metodoDePago =
                divElement.querySelector("#metodoPago").value;

            cliente.crearReserva(nuevaReserva);
        });

    return divElement;
};
