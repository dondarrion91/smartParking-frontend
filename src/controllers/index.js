import Home from "./home.controller";
import Login from "./login.controller";
import Register from "./register.controller";
import Parking from "./parking.controller";
import nuevaReserva from "./nueva-reserva.controller";
import menuUsuario from "./menu-usuario.controller";

const pages = {
    home: Home,
    login: Login,
    register: Register,
    parking: Parking,
    nuevaReserva: nuevaReserva,
    menuUsuario: menuUsuario,
};

export { pages };
