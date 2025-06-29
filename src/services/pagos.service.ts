import { pagos, PrismaClient } from "@prisma/client";
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
    const pago:pagos | null = await prisma.pagos.findUnique({
        where: {
            id_pago: id
        }
    });
    return pago ? fromPrismaPagos(pago): null;
};

export const insertarPagos = async (pago: Pago) => {
    console.log("Insertando nuevo pago");
    await prisma.pagos.create({
        data: toPrismaPagos(pago)
    });
    return RESPONSE_INSERT_OK;
};

export const modificarPagos = async (id: number, pago: Pago) => {
    console.log("Modificando pago");
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