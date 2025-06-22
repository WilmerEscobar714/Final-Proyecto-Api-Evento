import { PrismaClient } from "@prisma/client";
import { RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK,RESPONSE_DELETE_OK } from "../shared/constants";
import { Evento } from "../models/eventos";

const prisma = new PrismaClient();

export const listarEventos = async () => {
    console.log("Listando eventos");
    return await prisma.eventos.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_evento: 'asc'
        }
    });
};

export const obtenerEventos = async (id: number) => {
    console.log("Obteniendo evento por ID");
    const evento = await prisma.eventos.findUnique({
        where: {
            id_evento: id
        }
    });
    return evento;
};

export const insertarEventos = async (evento: Evento) => {
    console.log("Insertando nuevo evento");
    await prisma.eventos.create({
        data: {
            id_categoria: evento.id_categoria,
            nombre: evento.nombre,
            descripcion: evento.descripcion,
            lugar: evento.lugar,
            fecha: evento.fecha,
            hora: evento.hora
        }
    });
    return RESPONSE_INSERT_OK;
};

export const modificarEventos = async (id: number, evento: Evento) => {
    console.log("Modificando evento");
    await prisma.eventos.update({
        where: {
            id_evento: id
        },
        data: {
            id_categoria: evento.id_categoria,
            nombre: evento.nombre,
            descripcion: evento.descripcion,
            lugar: evento.lugar,
            fecha: evento.fecha,
            hora: evento.hora
        }
    });
    return RESPONSE_UPDATE_OK;
};

export const eliminarEventos = async (id: number) => {
    console.log("Eliminando evento");
    await prisma.eventos.update({
        where: {
            id_evento: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return RESPONSE_DELETE_OK;
};