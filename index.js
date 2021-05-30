import { router } from "./src/routes/index.routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./src/styles/style.scss";

const init = () => {
    router(window.location.hash);

    window.addEventListener("hashchange", () => {
        router(window.location.hash);
    });
};

window.addEventListener("load", init);
