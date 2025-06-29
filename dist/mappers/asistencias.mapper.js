"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPrismaAsistencias = exports.fromPrismaAsistencias = void 0;
const fromPrismaAsistencias = (asistencia) => {
    return {
        idAsistencia: asistencia.id_asistencia,
        idUsuario: asistencia.id_usuario,
        idEvento: asistencia.id_evento,
        nombres: asistencia.nombres,
        apellidos: asistencia.apellidos,
        correo: asistencia.correo,
        dni: asistencia.dni,
        telefono: asistencia.telefono,
        estadoAuditoria: asistencia.estado_auditoria,
        fechaRegistro: asistencia.fecha_registro ? new Date(asistencia.fecha_registro) : null,
        fechaActualizacion: asistencia.fecha_actualizacion ? new Date(asistencia.fecha_actualizacion) : null,
    };
};
exports.fromPrismaAsistencias = fromPrismaAsistencias;
const toPrismaAsistencias = (asistencias) => {
    return {
        id_evento: asistencias.idEvento,
        id_usuario: asistencias.idUsuario,
        nombres: asistencias.nombres,
        apellidos: asistencias.apellidos,
        correo: asistencias.correo,
        dni: asistencias.dni,
        telefono: asistencias.telefono
    };
};
exports.toPrismaAsistencias = toPrismaAsistencias;
