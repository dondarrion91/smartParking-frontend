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
}

module.exports = Usuarios;
