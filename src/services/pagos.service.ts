import { eventos, pagos, PrismaClient, usuarios } from "@prisma/client";
import { Pago } from "../models/pagos";
import { RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK,RESPONSE_DELETE_OK } from "../shared/constants";
import { fromPrismaPagos, toPrismaPagos } from '../mappers/pagos.mapper';

const prisma = new PrismaClient();

export const listarPagos = async () => {
    console.log("Listando pagos");
    const pago:pagos[] = await prisma.pagos.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_pago: 'asc'
        }
    });
    return pago.map((pagos: pagos) => fromPrismaPagos(pagos));
};

export const obtenerPagos = async (id: number) => {
    console.log("Obteniendo pago por ID");

    // Verificar si el pago existe antes de intentar obtenerlo
        const pagoExistente = await prisma.pagos.findUnique({
            where: { id_pago: id }
        });
                
        if (!pagoExistente) {
             throw new Error(`El pago con ID ${id} no existe.`);
         }

    const pago:pagos | null = await prisma.pagos.findUnique({
        where: {
            id_pago: id
        }
    });
    return pago ? fromPrismaPagos(pago): null;
};

export const insertarPagos = async (pago: Pago) => {
    console.log("Insertando nuevo pago");

    // Validar si el evento existe
    const pagoEvento = await verificarEventoExistente(pago.idEvento);
    if (!pagoEvento) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El evento con ID ${pago.idEvento} no existe.`);
    }

    // Validar si el usuario existe
    const pagosUsuario = await verificarUsuarioExistente(pago.idUsuario);
    if (!pagosUsuario) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El usuario con ID ${pago.idUsuario} no existe.`);
    }
    
    await prisma.pagos.create({
        data: toPrismaPagos(pago)
    });
    return RESPONSE_INSERT_OK;
};

export const modificarPagos = async (id: number, pago: Pago) => {
    console.log("Modificando pago");

    // Verificar si el pago existe antes de intentar modificarlo
     const pagoExistente = await prisma.pagos.findUnique({
         where: { id_pago: id }
     });
                
     if (!pagoExistente) {
          throw new Error(`El pago con ID ${id} no existe.`);
     }

    // Luego, valida si el evento  existe 
    // Se asume que idEvento es obligatorio para modificar, si no, deberías hacer un chequeo de `if (pago.idEvento)`
    const pagoEvento = await verificarEventoExistente(pago.idEvento);
    if (!pagoEvento) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El evento con ID ${pago.idEvento} no existe.`);
    }

    // Validar si el usuario existe
    const pagosUsuario = await verificarUsuarioExistente(pago.idUsuario);
    if (!pagosUsuario) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El usuario con ID ${pago.idUsuario} no existe.`);
    }

    const pagoActualizado ={...pago}
    await prisma.pagos.update({
        where: {
            id_pago: id
        },
        data: toPrismaPagos(pagoActualizado)
    });
    return RESPONSE_UPDATE_OK;
};

export const eliminarPagos = async (id: number) => {
    console.log("Eliminando pago");

    // Verificar si el pago existe antes de intentar eliminarlo
        const pagoExistente = await prisma.pagos.findUnique({
            where: { id_pago: id }
        });
                
        if (!pagoExistente) {
             throw new Error(`El pago con ID ${id} no existe.`);
         }

    await prisma.pagos.update({
        where: {
            id_pago: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return RESPONSE_DELETE_OK;
};

// NUEVA FUNCIÓN DE AYUDA para validar la existencia del evento
const verificarEventoExistente = async (id_evento: number) => {
    const evento: eventos | null = await prisma.eventos.findUnique({
        where: {
            id_evento:id_evento,
        },
    });
    return evento;
};

// NUEVA FUNCIÓN DE AYUDA para validar la existencia del usuarios
const verificarUsuarioExistente = async (id_usuario: number) => {
    const usu: usuarios | null = await prisma.usuarios.findUnique({
        where: {
            id_usuario:id_usuario,
        },
    });
    return usu;
};