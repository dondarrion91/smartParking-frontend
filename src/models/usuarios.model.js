import request from "../utils/request.class";

class Usuarios {
    constructor(
        reservas,
        idUsuario,
        nombreCompleto,
        usuario,
        password,
        dni,
        admin
    ) {
        this.reservas = reservas;
        this.idUsuario = idUsuario;
        this.nombreCompleto = nombreCompleto;
        this.usuario = usuario;
        this.password = password;
        this.dni = dni;
        this.admin = admin;
    }

    crearReserva(reserva, userId) {
        request
            .post("reservas", reserva)
            .then((res) => {                
                if (res.status !== 200) {
                    alert("Error a crear la reserva");
                    window.location.hash = "/#/parking";
                    return;
                } else {
                    return res.json();
                }
            })
            .then((dataReservas) => {                
                request
                    .getOne("usuarios", userId)
                    .then((res) => {
                        return res.json();
                    })
                    .then((userData) => {
                        if (dataReservas._id) {
                            userData.reservas.push({
                                reserva: dataReservas._id,
                            });
                        } else {
                            alert("Error a crear la reserva");
                            window.location.hash = "/parking";
                            return;
                        }

                        request
                            .put("usuarios", userId, {
                                reservas: userData.reservas,
                            })
                            .then((res) => {
                                if (res.status !== 200) {
                                    alert("Error a crear la reserva");
                                    window.location.hash = "/parking";
                                } else {
                                    window.location.hash = "/menu-usuario";
                                }
                            });
                    });
            });
    }
}

export { Usuarios };
