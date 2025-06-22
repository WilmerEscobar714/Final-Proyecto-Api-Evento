import { PrismaClient } from "@prisma/client";
import { Pago } from "../models/pagos";
import { RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK,RESPONSE_DELETE_OK } from "../shared/constants";

const prisma = new PrismaClient();

export const listarPagos = async () => {
    console.log("Listando pagos");
    return await prisma.pagos.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_pago: 'asc'
        }
    });
};

export const obtenerPagos = async (id: number) => {
    console.log("Obteniendo pago por ID");
    const pago = await prisma.pagos.findUnique({
        where: {
            id_pago: id
        }
    });
    return pago;
};

export const insertarPagos = async (pago: Pago) => {
    console.log("Insertando nuevo pago");
    await prisma.pagos.create({
        data: {
            id_evento: pago.id_evento,
            id_usuario: pago.id_usuario,
            monto: pago.monto,
            metodo_pago: pago.metodo_pago
        }
    });
    return RESPONSE_INSERT_OK;
};

export const modificarPagos = async (id: number, pago: Pago) => {
    console.log("Modificando pago");
    await prisma.pagos.update({
        where: {
            id_pago: id
        },
        data: {
            id_evento: pago.id_evento,
            id_usuario: pago.id_usuario,
            monto: pago.monto,
            metodo_pago: pago.metodo_pago
        }
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