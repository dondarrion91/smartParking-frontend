import view from "../views/login.html";
import "../styles/login.scss";
<<<<<<< HEAD
=======
import request from "../utils/request.class";
>>>>>>> master

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    class loginController {
        constructor() {
            this.usuario = "";
            this.password = "";
<<<<<<< HEAD
            this.url = "http://localhost:3000/api/v1" + "/login";
=======
>>>>>>> master
        }

        login() {
            this.usuario = divElement.querySelector("#user").value;
            this.password = divElement.querySelector("#password").value;

<<<<<<< HEAD
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
=======
            request
                .post("login", {
                    usuario: this.usuario,
                    password: this.password,
                })
>>>>>>> master
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
<<<<<<< HEAD
=======
                    console.log(data);
>>>>>>> master
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
