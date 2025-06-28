import { categorias } from "@prisma/client";
import { Categoria } from "../models/categorias";


export const fromPrismaCategoria = (categoria: categorias) => {
  return {
    idCategoria: categoria.id_categoria,
    nombre: categoria.nombre,
    estadoAuditoria: categoria.estado_auditoria,
    fechaCreacion: categoria.fecha_creacion ? new Date(categoria.fecha_creacion) : null,
    fechaActualizacion: categoria.fecha_actualizacion ? new Date(categoria.fecha_actualizacion) : null,
  };
}

export const toPrismaCategoria = (categoria: Categoria) => {
    return {
        nombre: categoria.nombre,
    };
    }