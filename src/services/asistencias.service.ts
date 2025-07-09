import { asistencias, PrismaClient, usuarios } from "@prisma/client";
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

    // Verificar si asistencia existe antes de intentar obtenerlo
    const asistenciaExistente = await prisma.asistencias.findUnique({
        where: { id_asistencia: id }
    });
            
    if (!asistenciaExistente) {
         throw new Error(`La asistencia con ID ${id} no existe.`);
     }

    const asistencia:asistencias | null = await prisma.asistencias.findUnique({
        where: {
            id_asistencia: id
        }
    });
    return asistencia ? fromPrismaAsistencias(asistencia): null;
};

export const insertarAsistencias = async (asistencia: Asistencia) => {
    console.log("Insertando nueva asistencia");

    // Validar si el usuario existe
    const asistencias = await verificarUsuarioExistente(asistencia.idUsuario);
    if (!asistencias) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El usuario con ID ${asistencia.idUsuario} no existe.`);
    }

    await prisma.asistencias.create({
        data: toPrismaAsistencias(asistencia)
    });
    return RESPONSE_INSERT_OK;
};

export const modificarAsistencias = async (id: number, asistencia: Asistencia) => {
    console.log("Modificando asistencia");

    // Verificar si asistencia existe antes de intentar modificarlo
    const asistenciaExistente = await prisma.asistencias.findUnique({
        where: { id_asistencia: id }
    });
            
    if (!asistenciaExistente) {
         throw new Error(`La asistencia con ID ${id} no existe.`);
     }

    // Luego, valida si el usuario  existe 
    // Se asume que idUsuario es obligatorio para modificar, si no, deberías hacer un chequeo de `if (asistencia.idUsuario)`
    const asistencias = await verificarUsuarioExistente(asistencia.idUsuario);
    if (!asistencias) {
         // Lanza un error que el controlador pueda capturar
        throw new Error(`El usuario con ID ${asistencia.idUsuario} no existe.`);
    }

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

     // Verificar si asistencia existe antes de intentar eliminarlo
    const asistenciaExistente = await prisma.asistencias.findUnique({
        where: { id_asistencia: id }
    });
            
    if (!asistenciaExistente) {
         throw new Error(`La asistencia con ID ${id} no existe.`);
     }

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

// NUEVA FUNCIÓN DE AYUDA para validar la existencia del usuarios
const verificarUsuarioExistente = async (id_usuario: number) => {
    const usuario: usuarios | null = await prisma.usuarios.findUnique({
        where: {
            id_usuario:id_usuario,
        },
    });
    return usuario;
};