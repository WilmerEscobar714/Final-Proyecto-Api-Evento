import { usuarios } from "@prisma/client";
import { Usuario } from "../models/usuarios";

export const fromPrismaUsuario = (usuario: usuarios) => {
    return {
        idUsuario: usuario.id_usuario,
        idEvento: usuario.id_evento,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        dni: usuario.dni,
        estadoAuditoria: usuario.estado_auditoria,
        fechaCreacion: usuario.fecha_creacion ? new Date(usuario.fecha_creacion) : null,
        fechaActualizacion: usuario.fecha_actualizacion ? new Date(usuario.fecha_actualizacion) : null,
    };
}

export const toPrismaUsuario = (usuario: Usuario) => {

    return {
        id_evento: usuario.idEvento,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        dni: usuario.dni,
    };

}