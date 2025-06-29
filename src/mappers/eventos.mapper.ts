import { eventos } from "@prisma/client";
import { Evento } from "../models/eventos";


export const fromPrismaEventos = (evento: eventos) => {
    return {
        idEvento: evento.id_evento,
        idCategoria: evento.id_categoria,
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        lugar: evento.lugar,
        fecha: evento.fecha,
        hora: evento.hora,
        estadoAuditoria: evento.estado_auditoria,
        fechaCreacion: evento.fecha_creacion ? new Date(evento.fecha_creacion) : null,
        fechaActualizacion: evento.fecha_actualizacion ? new Date(evento.fecha_actualizacion) : null
    };
}

export const toPrismaEventos = (evento: Evento) => {

    const fechaConvertida = new Date(evento.fecha);
     const horaConvertida = new Date(`1900-01-01T${evento.hora}:00Z`);

    return {
        id_categoria: evento.idCategoria,
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        lugar: evento.lugar,
        fecha: fechaConvertida,
        hora: horaConvertida,
    }

}
