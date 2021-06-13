import view from "../views/register.html";
import "../styles/register.scss";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    class registerController {
        constructor() {
            this.usuario = "";
            this.password = "";
            this.checkPassword = "";
            this.nombreCompleto = "";
            this.patente = "";
            this.marca = "";
            this.modelo = "";
            this.dni = "";
            this.url = "http://localhost:3000/api/v1" + "/register";
        }

        cargarVehiculo() {
            this.patente = divElement.querySelector("#patente").value;
            this.marca = divElement.querySelector("#marca").value;
            this.modelo = divElement.querySelector("#modelo").value;

            return fetch("http://localhost:3000/api/v1/vehiculos", {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    patente: this.patente,
                    marca: this.marca,
                    modelo: this.modelo,
                }),
            }).then((res) => {
                console.log(res);
                return res.json();
            });
        }

        register() {
            this.usuario = divElement.querySelector("#user").value;
            this.password = divElement.querySelector("#password").value;
            this.checkPassword =
                divElement.querySelector("#check-password").value;
            this.nombreCompleto = divElement.querySelector("#fullname").value;
            this.dni = divElement.querySelector("#dni").value;

            if (this.password !== this.checkPassword) {
                divElement
                    .querySelector("button")
                    .insertAdjacentHTML(
                        "afterend",
                        "<p class='text-danger'>Las contraseñas deben coincidir</p>"
                    );
            } else {
                this.cargarVehiculo().then((vehiculo) => {
                    fetch(this.url, {
                        method: "POST",
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            usuario: this.usuario,
                            password: this.password,
                            checkPassword: this.checkPassword,
                            nombreCompleto: this.nombreCompleto,
                            dni: this.dni,
                            vehiculo: vehiculo._id,
                        }),
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            console.log(data);
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
