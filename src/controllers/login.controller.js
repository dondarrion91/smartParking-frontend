import view from "../views/login.html";
import "../styles/login.scss";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    return divElement;
};
