"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCategorias = exports.modificarCategorias = exports.insertarCategorias = exports.obtenerCategorias = exports.listarCategorias = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../shared/constants");
const categorias_mapper_1 = require("../mappers/categorias.mapper");
const prisma = new client_1.PrismaClient();
const listarCategorias = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando categorias");
    const categorias = yield prisma.categorias.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_categoria: 'asc'
        }
    });
    return categorias.map((categoria) => (0, categorias_mapper_1.fromPrismaCategoria)(categoria));
});
exports.listarCategorias = listarCategorias;
const obtenerCategorias = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo categoria por ID");
    // Opcional: Verificar si la categoria existe antes de intentar obtenerlo
    const categoriaExistente = yield prisma.categorias.findUnique({
        where: { id_categoria: id }
    });
    if (!categoriaExistente) {
        throw new Error(`El médico con ID ${id} no existe.`);
    }
    const categoria = yield prisma.categorias.findUnique({
        where: {
            id_categoria: id
        }
    });
    return categoria ? (0, categorias_mapper_1.fromPrismaCategoria)(categoria) : null;
});
exports.obtenerCategorias = obtenerCategorias;
const insertarCategorias = (categoria) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nueva categoria");
    yield prisma.categorias.create({
        data: (0, categorias_mapper_1.toPrismaCategoria)(categoria)
    });
    return constants_1.RESPONSE_INSERT_OK;
});
exports.insertarCategorias = insertarCategorias;
const modificarCategorias = (id, categoria) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando categoria");
    // Opcional: Verificar si la categoria existe antes de modificar
    const categoriaExistente = yield prisma.categorias.findUnique({
        where: { id_categoria: id }
    });
    if (!categoriaExistente) {
        throw new Error(`El médico con ID ${id} no existe.`);
    }
    const dataActualizada = Object.assign({}, categoria);
    yield prisma.categorias.update({
        where: {
            id_categoria: id
        },
        data: (0, categorias_mapper_1.toPrismaCategoria)(dataActualizada)
    });
    return constants_1.RESPONSE_UPDATE_OK;
});
exports.modificarCategorias = modificarCategorias;
const eliminarCategorias = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando categoria");
    // Opcional: Verificar si la categoria existe antes de intentar eliminar
    const categoriaExistente = yield prisma.categorias.findUnique({
        where: { id_categoria: id }
    });
    if (!categoriaExistente) {
        throw new Error(`El médico con ID ${id} no existe para eliminar.`);
    }
    yield prisma.categorias.update({
        where: {
            id_categoria: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return constants_1.RESPONSE_DELETE_OK;
});
exports.eliminarCategorias = eliminarCategorias;
