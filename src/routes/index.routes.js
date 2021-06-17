import { pages } from "../controllers/index";

// const url = "http://localhost:3000/api/v1/";
const url = "https://smartparkingunc.herokuapp.com/api/v1/";

fetch(url + "test-cookie", {
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
        if (data !== true) {
            localStorage.setItem("user", "");
            window.location.hash = "#/login";
        }
    });

const router = async (route) => {
    let content = document.getElementById("app");
    content.innerHTML = "";

    switch (route) {
        case "#/login": {
            return content.appendChild(pages.login());
        }
        case "#/register": {
            return content.appendChild(pages.register());
        }
        case "#/menu-usuario": {
            if (JSON.parse(localStorage.getItem("user"))) {
                return content.appendChild(pages.menuUsuario());
            }

            window.location.hash = "#/login";
        }
        case "#/parking": {
            if (JSON.parse(localStorage.getItem("user"))) {
                return content.appendChild(pages.parking());
            }

            window.location.hash = "#/login";
        }
        case "#/nueva-reserva": {
            if (JSON.parse(localStorage.getItem("user"))) {
                return content.appendChild(pages.nuevaReserva());
            }

            window.location.hash = "#/login";
        }
        default: {
            return content.appendChild(pages.login());
        }
    }
};

export { router };
