import { pages } from "../controllers/index";

fetch("http://localhost:3000/api/v1/test-cookie", {
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
            localStorage.setItem("logged", "false");
        }
    });

const router = async (route) => {
    let content = document.getElementById("app");
    content.innerHTML = "";

    switch (route) {
        case "#/": {
            return content.appendChild(pages.home());
        }
        case "#/login": {
            return content.appendChild(pages.login());
        }
        case "#/register": {
            return content.appendChild(pages.register());
        }
        case "#/parking": {
            if (JSON.parse(localStorage.getItem("logged"))) {
                return content.appendChild(pages.parking());
            }

            window.location.hash = "#/login";
        }
        default: {
            return content.appendChild(pages.login());
        }
    }
};

export { router };
