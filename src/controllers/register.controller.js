import view from "../views/register.html";
import "../styles/register.scss";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    return divElement;
};
