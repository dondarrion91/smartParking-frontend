import { router } from "./routes/index.routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";

const init = () => {
    router(window.location.hash);

    window.addEventListener("hashchange", () => {
        router(window.location.hash);
    });
};

window.addEventListener("load", init);
