import view from "../views/login.html";
import "../styles/login.scss";
import request from "../utils/request.class";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    class loginController {
        constructor() {
            this.usuario = "";
            this.password = "";
        }

        login() {
            this.usuario = divElement.querySelector("#user").value;
            this.password = divElement.querySelector("#password").value;

            request
                .post("login", {
                    usuario: this.usuario,
                    password: this.password,
                })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    localStorage.setItem(
                        "user",
                        JSON.stringify({
                            id: data.id,
                            user: data.usuario,
                            admin: data.admin,
                            auth: true,
                        })
                    );
                    window.location.hash = "#/parking";
                });
        }
    }

    const auth = new loginController();

    divElement
        .querySelector("button")
        .addEventListener("click", function (event) {
            event.preventDefault();
            auth.login();
        });

    return divElement;
};
