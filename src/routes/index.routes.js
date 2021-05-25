import { pages } from "../controllers/index";

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
        default: {
            return content.appendChild(pages.login());
        }
    }
};

export { router };
