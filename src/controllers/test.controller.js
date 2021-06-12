import view from "../views/test.html";

export default () => {
    const divElement = document.createElement("div");
    divElement.innerHTML = view;

    return divElement;
};
