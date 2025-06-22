import { PrismaClient } from "@prisma/client";
import {Usuario} from "../models/usuarios";
import { RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK,RESPONSE_DELETE_OK } from "../shared/constants";


const prisma = new PrismaClient();

export const listarUsuarios = async () => {
    console.log("Listando usuarios");
    return await prisma.usuarios.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_usuario: 'asc'
        }
    });
}

export const obtenerUsuarios = async(id:number)=> {
    console.log("Obteniendo usuario por ID");
    const usuario = await prisma.usuarios.findUnique({
        where: {
            id_usuario: id
        }
    });
    return usuario;
}

export const insertarUsuarios = async(usuario: Usuario) => {
    console.log("Insertando nuevo usuario");
    await prisma.usuarios.create({
        data: {
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            dni: usuario.dni
        }
    });
     return RESPONSE_INSERT_OK;
}

export const modificarUsuarios = async(id: number, usuario: Usuario) => {
    console.log("Modificando usuario");
    await prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: {
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            dni: usuario.dni
        }
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