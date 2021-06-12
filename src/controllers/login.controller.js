import view from "../views/login.html";
import "../styles/login.scss";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    class loginController {
        constructor() {
            this.usuario = "";
            this.password = "";
            this.url = "http://localhost:3000/api/v1" + "/login";
        }

        login() {
            this.usuario = divElement.querySelector("#user").value;
            this.password = divElement.querySelector("#password").value;

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
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    localStorage.setItem("logged", "true");
                    window.location.hash = "#/test";
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
