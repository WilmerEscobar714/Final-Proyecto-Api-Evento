import { categorias, PrismaClient } from "@prisma/client";
import { Categoria } from "../models/categorias";
import { RESPONSE_INSERT_OK, RESPONSE_UPDATE_OK,RESPONSE_DELETE_OK } from "../shared/constants";
import { fromPrismaCategoria, toPrismaCategoria } from "../mappers/categorias.mapper";

const prisma = new PrismaClient();

export const listarCategorias = async () => {
    console.log("Listando categorias");;
    const categorias: categorias[] = await prisma.categorias.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_categoria: 'asc'
        }
    });
    return categorias.map((categoria:categorias )=> fromPrismaCategoria(categoria));
}

export const obtenerCategorias = async(id:number)=> {
    console.log("Obteniendo categoria por ID");
    const categoria: categorias | null = await prisma.categorias.findUnique({
        where: {
            id_categoria: id
        }
    });
    return categoria ? fromPrismaCategoria(categoria) : null;
}

export const insertarCategorias = async(categoria: Categoria) => {
    console.log("Insertando nueva categoria");
    await prisma.categorias.create({
        data: toPrismaCategoria(categoria)
    });
     return RESPONSE_INSERT_OK;
}

export const modificarCategorias = async(id: number, categoria: Categoria) => {
    console.log("Modificando categoria");

    const dataActualizada={...categoria};
    
    await prisma.categorias.update({
        where: {
            id_categoria: id
        },
        data: toPrismaCategoria(dataActualizada)
    });
    return RESPONSE_UPDATE_OK;
}

export const eliminarCategorias = async(id: number) => {
    console.log("Eliminando categoria");
    await prisma.categorias.update({
        where: {
            id_categoria: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return RESPONSE_DELETE_OK;
}