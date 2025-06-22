import { PrismaClient } from "@prisma/client";
import { RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK,RESPONSE_DELETE_OK } from "../shared/constants";
import { Asistencia } from "../models/asistencias";

const prisma = new PrismaClient();

export const listarAsistencias = async () => {
    console.log("Listando asistencias");
    return await prisma.asistencias.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_asistencia: 'asc'
        }
    });
};

export const obtenerAsistencias = async (id: number) => {
    console.log("Obteniendo asistencia por ID");
    const asistencia = await prisma.asistencias.findUnique({
        where: {
            id_asistencia: id
        }
    });
    return asistencia;
};

export const insertarAsistencias = async (asistencia: Asistencia) => {
    console.log("Insertando nueva asistencia");
    await prisma.asistencias.create({
        data: {
            id_evento: asistencia.id_evento,
            id_usuario: asistencia.id_usuario,
            nombres: asistencia.nombres,
            apellidos: asistencia.apellidos,
            correo: asistencia.correo,
            dni: asistencia.dni,
            telefono: asistencia.telefono
        }
    });
    return RESPONSE_INSERT_OK;
};

export const modificarAsistencias = async (id: number, asistencia: Asistencia) => {
    console.log("Modificando asistencia");
    await prisma.asistencias.update({
        where: {
            id_asistencia: id
        },
        data: {
            id_evento: asistencia.id_evento,
            id_usuario: asistencia.id_usuario,
            nombres: asistencia.nombres,
            apellidos: asistencia.apellidos,
            correo: asistencia.correo,
            dni: asistencia.dni,
            telefono: asistencia.telefono
        }
    });
    return RESPONSE_UPDATE_OK;
};

export const eliminarAsistencias = async (id: number) => {
    console.log("Eliminando asistencia");
    await prisma.asistencias.update({
        where: {
            id_asistencia: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return RESPONSE_DELETE_OK;
};