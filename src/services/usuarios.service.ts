import { PrismaClient, usuarios } from "@prisma/client";
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
    const usuario: usuarios | null = await prisma.usuarios.findUnique({
        where: {
            id_usuario: id
        }
    });
    return usuario ? fromPrismaUsuario(usuario) : null;
}

export const insertarUsuarios = async(usuario: Usuario) => {
    console.log("Insertando nuevo usuario");
    await prisma.usuarios.create({
        data: toPrismaUsuario(usuario)
    });
     return RESPONSE_INSERT_OK;
}

export const modificarUsuarios = async(id: number, usuario: Usuario) => {
    console.log("Modificando usuario");
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