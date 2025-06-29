import { asistencias } from "@prisma/client";
import { Asistencia } from "../models/asistencias";

export const fromPrismaAsistencias = (asistencia:asistencias)=>{
    return{
        idAsistencia: asistencia.id_asistencia,
        idUsuario: asistencia.id_usuario,
        idEvento: asistencia.id_evento,
        nombres: asistencia.nombres,
        apellidos: asistencia.apellidos,
        correo: asistencia.correo,
        dni: asistencia.dni,
        telefono: asistencia.telefono,
        asistio: asistencia.asistio,
        estadoAuditoria: asistencia.estado_auditoria,
        fechaRegistro: asistencia.fecha_registro ? new Date(asistencia.fecha_registro) : null,
        fechaActualizacion: asistencia.fecha_actualizacion ? new Date(asistencia.fecha_actualizacion) : null,
    }
}

export const toPrismaAsistencias = (asistencias:Asistencia)=>{
    return{
        id_evento:asistencias.idEvento,
        id_usuario:asistencias.idUsuario,
        nombres:asistencias.nombres,
        apellidos:asistencias.apellidos,
        correo:asistencias.correo,
        dni:asistencias.dni,
        telefono:asistencias.telefono,
        asistio:asistencias.asistio
    }
}