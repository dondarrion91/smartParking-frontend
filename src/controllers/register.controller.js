import view from "../views/register.html";
import "../styles/register.scss";
<<<<<<< HEAD
import Cliente from "../models/cliente.model";
import Vehiculos from "../models/vehiculos.model";
=======
import { Cliente } from "../models/cliente.model";
import Vehiculos from "../models/vehiculos.model";
import request from "../utils/request.class";
>>>>>>> master

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    class registerController {
<<<<<<< HEAD
        constructor() {
            this.url = "http://localhost:3000/api/v1" + "/register";
        }

=======
>>>>>>> master
        cargarVehiculo() {
            const nuevoVehiculo = new Vehiculos(
                undefined,
                divElement.querySelector("#patente").value,
                divElement.querySelector("#marca").value,
                divElement.querySelector("#modelo").value
            );

<<<<<<< HEAD
            return fetch("http://localhost:3000/api/v1/vehiculos", {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patente: nuevoVehiculo.patente,
                    marca: nuevoVehiculo.marca,
                    modelo: nuevoVehiculo.modelo,
                }),
            }).then((res) => {
                return res.json();
            });
=======
            return request
                .post("vehiculos", {
                    patente: nuevoVehiculo.patente,
                    marca: nuevoVehiculo.marca,
                    modelo: nuevoVehiculo.modelo,
                })
                .then((res) => {
                    return res.json();
                });
>>>>>>> master
        }

        register() {
            const nuevoCliente = new Cliente(
                undefined,
                undefined,
                divElement.querySelector("#fullname").value,
                divElement.querySelector("#user").value,
                divElement.querySelector("#password").value,
                divElement.querySelector("#dni").value
            );

            if (
                divElement.querySelector("#password").value !==
                divElement.querySelector("#check-password").value
            ) {
                divElement
                    .querySelector("button")
                    .insertAdjacentHTML(
                        "afterend",
                        "<p class='text-danger'>Las contraseñas deben coincidir</p>"
                    );
            } else {
                this.cargarVehiculo().then((vehiculo) => {
<<<<<<< HEAD
                    fetch(this.url, {
                        method: "POST",
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
=======
                    if (vehiculo.message === "Internal Server Error") {
                        alert("Patente repetida");
                        return;
                    }
                    request
                        .post("register", {
>>>>>>> master
                            usuario: nuevoCliente.usuario,
                            password: nuevoCliente.password,
                            checkPassword: nuevoCliente.checkPassword,
                            nombreCompleto: nuevoCliente.nombreCompleto,
                            dni: nuevoCliente.dni,
                            vehiculo: vehiculo._id,
                            admin: nuevoCliente.admin,
<<<<<<< HEAD
                        }),
                    })
=======
                        })
>>>>>>> master
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            divElement.innerHTML =
                                "<p class='text-success text-center h2'>Usuario creado con exito</p><br><a href='#/login'>Iniciar Sesion</a>";
                        });
                });
            }
        }
    }

    const register = new registerController();

    divElement
        .querySelector("button")
        .addEventListener("click", function (event) {
            event.preventDefault();
            register.register();
        });

    return divElement;
};
