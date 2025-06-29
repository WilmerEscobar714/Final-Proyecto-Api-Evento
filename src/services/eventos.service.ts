import { eventos, PrismaClient } from "@prisma/client";
import { RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK,RESPONSE_DELETE_OK } from "../shared/constants";
import { Evento } from "../models/eventos";
import { fromPrismaEventos, toPrismaEventos } from "../mappers/eventos.mapper";

const prisma = new PrismaClient();

export const listarEventos = async () => {
    console.log("Listando eventos");
    const eventos:eventos[] = await prisma.eventos.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_evento: 'asc'
        }
    });
    return eventos.map((evento:eventos) => fromPrismaEventos(evento)); 
};

export const obtenerEventos = async (id: number) => {
    console.log("Obteniendo evento por ID");
    const evento:eventos | null = await prisma.eventos.findUnique({
        where: {
            id_evento: id
        }
    });
    return evento ? fromPrismaEventos(evento) : null;
};

export const insertarEventos = async (evento: Evento) => {
    console.log("Insertando nuevo evento");
    await prisma.eventos.create({
        data: toPrismaEventos(evento)
    });
    return RESPONSE_INSERT_OK;
};

export const modificarEventos = async (id: number, evento: Evento) => {
    console.log("Modificando evento");
    const eventoActualizado={...evento}
    await prisma.eventos.update({
        where: {
            id_evento: id
        },
        data: toPrismaEventos(eventoActualizado)
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