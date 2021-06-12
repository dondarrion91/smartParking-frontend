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
            this.dni = "";
            this.url = "http://localhost:3000/api/v1" + "/register";
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
