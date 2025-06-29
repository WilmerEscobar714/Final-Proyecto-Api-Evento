import { asistencias, PrismaClient } from "@prisma/client";
import { RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK,RESPONSE_DELETE_OK } from "../shared/constants";
import { Asistencia } from "../models/asistencias";
import { fromPrismaAsistencias, toPrismaAsistencias } from "../mappers/asistencias.mapper";

const prisma = new PrismaClient();

export const listarAsistencias = async () => {
    console.log("Listando asistencias");
    const asistencias:asistencias[] = await prisma.asistencias.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_asistencia: 'asc'
        }
    });
    return asistencias.map((asistencia:asistencias)=> fromPrismaAsistencias(asistencia));
};


export const obtenerAsistencias = async (id: number) => {
    console.log("Obteniendo asistencia por ID");
    const asistencia:asistencias | null = await prisma.asistencias.findUnique({
        where: {
            id_asistencia: id
        }
    });
    return asistencia ? fromPrismaAsistencias(asistencia): null;
};

export const insertarAsistencias = async (asistencia: Asistencia) => {
    console.log("Insertando nueva asistencia");
    await prisma.asistencias.create({
        data: toPrismaAsistencias(asistencia)
    });
    return RESPONSE_INSERT_OK;
};

export const modificarAsistencias = async (id: number, asistencia: Asistencia) => {
    console.log("Modificando asistencia");
    const asistenciaActualizada = {...asistencia}
    await prisma.asistencias.update({
        where: {
            id_asistencia: id
        },
        data: toPrismaAsistencias(asistenciaActualizada)
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