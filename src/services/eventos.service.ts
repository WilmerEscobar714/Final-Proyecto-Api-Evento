import { categorias, eventos, PrismaClient } from "@prisma/client";
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

     // Verificar si el evento existe antes de intentar obtenerlo
        const eventoExistente = await prisma.eventos.findUnique({
            where: { id_evento: id }
        });
    
        if (!eventoExistente) {
            throw new Error(`El Evento con ID ${id} no existe.`);
        }

    const evento:eventos | null = await prisma.eventos.findUnique({
        where: {
            id_evento: id
        }
    });
    return evento ? fromPrismaEventos(evento) : null;
};

export const insertarEventos = async (evento: Evento) => {
    console.log("Insertando nuevo evento");

     // Validar si la categoria existe
    const categoria = await verificarCategoriaExistente(evento.idCategoria);
    if (!categoria) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`La categoria con ID ${evento.idCategoria} no existe.`);
    }
    
    await prisma.eventos.create({
        data: toPrismaEventos(evento)
    });
    return RESPONSE_INSERT_OK;
};

export const modificarEventos = async (id: number, evento: Evento) => {
    console.log("Modificando evento");

     // Verificar si el evento existe antes de intentar modificarlo
        const eventoExistente = await prisma.eventos.findUnique({
            where: { id_evento: id }
        });
    
        if (!eventoExistente) {
            throw new Error(`El Evento con ID ${id} no existe.`);
        }

    // Luego, valida si la categoria  existe 
    // Se asume que idCategoria es obligatorio para modificar, si no, deberías hacer un chequeo de `if (evento.idCategoria)`
    const categoria = await verificarCategoriaExistente(evento.idCategoria);
    if (!categoria) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`La categoria con ID ${evento.idCategoria} no existe.`);
    }

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

    // Verificar si el evento existe antes de intentar eliminarla
        const eventoExistente = await prisma.eventos.findUnique({
            where: { id_evento: id }
        });
    
        if (!eventoExistente) {
            throw new Error(`El Evento con ID ${id} no existe.`);
        }

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

// NUEVA FUNCIÓN DE AYUDA para validar la existencia de la categoria
const verificarCategoriaExistente = async (id_categoria: number) => {
    const categoria: categorias | null = await prisma.categorias.findUnique({
        where: {
            id_categoria:id_categoria,
        },
    });
    return categoria;
};