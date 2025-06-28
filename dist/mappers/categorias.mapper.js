"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPrismaCategoria = exports.fromPrismaCategoria = void 0;
const fromPrismaCategoria = (categoria) => {
    return {
        idCategoria: categoria.id_categoria,
        nombre: categoria.nombre,
        estadoAuditoria: categoria.estado_auditoria,
        fechaCreacion: categoria.fecha_creacion ? new Date(categoria.fecha_creacion) : null,
        fechaActualizacion: categoria.fecha_actualizacion ? new Date(categoria.fecha_actualizacion) : null,
    };
};
exports.fromPrismaCategoria = fromPrismaCategoria;
const toPrismaCategoria = (categoria) => {
    return {
        nombre: categoria.nombre,
    };
};
exports.toPrismaCategoria = toPrismaCategoria;
