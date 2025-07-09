import { eventos, PrismaClient, usuarios } from "@prisma/client";
import {Usuario} from "../models/usuarios";
import { RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK,RESPONSE_DELETE_OK } from "../shared/constants";
import { fromPrismaUsuario, toPrismaUsuario } from "../mappers/usuarios.mapper";


const prisma = new PrismaClient();

export const listarUsuarios = async () => {
    console.log("Listando usuarios");
    const usuarios:usuarios[]= await prisma.usuarios.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_usuario: 'asc'
        }
    });
    return usuarios.map((usuario:usuarios) =>fromPrismaUsuario(usuario));   
}

export const obtenerUsuarios = async(id:number)=> {
    console.log("Obteniendo usuario por ID");

    // Verificar si el usuario existe antes de intentar obtenerlo
            const usuarioExistente = await prisma.usuarios.findUnique({
                where: { id_usuario: id }
            });
        
            if (!usuarioExistente) {
                throw new Error(`El Usuario con ID ${id} no existe.`);
            }

    const usuario: usuarios | null = await prisma.usuarios.findUnique({
        where: {
            id_usuario: id
        }
    });
    return usuario ? fromPrismaUsuario(usuario) : null;
}

export const insertarUsuarios = async(usuario: Usuario) => {
    console.log("Insertando nuevo usuario");

     // Validar si el evento existe
    const usuarios = await verificarEventoExistente(usuario.idEvento);
    if (!usuarios) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El evento con ID ${usuario.idEvento} no existe.`);
    }

    await prisma.usuarios.create({
        data: toPrismaUsuario(usuario)
    });
     return RESPONSE_INSERT_OK;
}

export const modificarUsuarios = async(id: number, usuario: Usuario) => {
    console.log("Modificando usuario");

     // Verificar si el usuario existe antes de intentar modificarlo
            const usuarioExistente = await prisma.usuarios.findUnique({
                where: { id_usuario: id }
            });
        
            if (!usuarioExistente) {
                throw new Error(`El Usuario con ID ${id} no existe.`);
            }

    // Luego, valida si el evento  existe 
    // Se asume que idEvento es obligatorio para modificar, si no, deberías hacer un chequeo de `if (usuario.idEvento)`
    const usuarios = await verificarEventoExistente(usuario.idEvento);
    if (!usuarios) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El evento con ID ${usuario.idEvento} no existe.`);
    }

    const usuarioActualizado={...usuario}
    await prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: toPrismaUsuario(usuarioActualizado)
    });
    return RESPONSE_UPDATE_OK;
}

export const eliminarUsuarios = async(id: number) => {
    console.log("Eliminando usuario");

    // Verificar si el usuario existe antes de intentar eliminarlo
            const usuarioExistente = await prisma.usuarios.findUnique({
                where: { id_usuario: id }
            });
        
            if (!usuarioExistente) {
                throw new Error(`El Usuario con ID ${id} no existe.`);
            }

    await prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return RESPONSE_DELETE_OK;
}


// NUEVA FUNCIÓN DE AYUDA para validar la existencia del evento
const verificarEventoExistente = async (id_evento: number) => {
    const evento: eventos | null = await prisma.eventos.findUnique({
        where: {
            id_evento:id_evento,
        },
    });
    return evento;
};