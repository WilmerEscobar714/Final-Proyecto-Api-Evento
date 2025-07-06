"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPrismaAsistencias = exports.fromPrismaAsistencias = void 0;
const fromPrismaAsistencias = (asistencia) => {
    return {
        idAsistencia: asistencia.id_asistencia,
        idUsuario: asistencia.id_usuario,
        telefono: asistencia.telefono,
        asistio: asistencia.asistio,
        estadoAuditoria: asistencia.estado_auditoria,
        fechaRegistro: asistencia.fecha_registro ? new Date(asistencia.fecha_registro) : null,
        fechaActualizacion: asistencia.fecha_actualizacion ? new Date(asistencia.fecha_actualizacion) : null,
    };
};
exports.fromPrismaAsistencias = fromPrismaAsistencias;
const toPrismaAsistencias = (asistencias) => {
    return {
        id_usuario: asistencias.idUsuario,
        telefono: asistencias.telefono,
        asistio: asistencias.asistio
    };
};
exports.toPrismaAsistencias = toPrismaAsistencias;
