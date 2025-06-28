"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPrismaUsuario = exports.fromPrismaUsuario = void 0;
const fromPrismaUsuario = (usuario) => {
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
};
exports.fromPrismaUsuario = fromPrismaUsuario;
const toPrismaUsuario = (usuario) => {
    return {
        id_evento: usuario.idEvento,
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        dni: usuario.dni,
    };
};
exports.toPrismaUsuario = toPrismaUsuario;
