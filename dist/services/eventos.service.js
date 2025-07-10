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
exports.eliminarEventos = exports.modificarEventos = exports.insertarEventos = exports.obtenerEventos = exports.listarEventos = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../shared/constants");
const eventos_mapper_1 = require("../mappers/eventos.mapper");
const prisma = new client_1.PrismaClient();
const listarEventos = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando eventos");
    const eventos = yield prisma.eventos.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_evento: 'asc'
        }
    });
    return eventos.map((evento) => (0, eventos_mapper_1.fromPrismaEventos)(evento));
});
exports.listarEventos = listarEventos;
const obtenerEventos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo evento por ID");
    // Verificar si el evento existe antes de intentar obtenerlo
    const eventoExistente = yield prisma.eventos.findUnique({
        where: { id_evento: id }
    });
    if (!eventoExistente) {
        throw new Error(`El Evento con ID ${id} no existe.`);
    }
    const evento = yield prisma.eventos.findUnique({
        where: {
            id_evento: id
        }
    });
    return evento ? (0, eventos_mapper_1.fromPrismaEventos)(evento) : null;
});
exports.obtenerEventos = obtenerEventos;
const insertarEventos = (evento) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nuevo evento");
    // Validar si la categoria existe
    const categoria = yield verificarCategoriaExistente(evento.idCategoria);
    if (!categoria) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`La categoria con ID ${evento.idCategoria} no existe.`);
    }
    yield prisma.eventos.create({
        data: (0, eventos_mapper_1.toPrismaEventos)(evento)
    });
    return constants_1.RESPONSE_INSERT_OK;
});
exports.insertarEventos = insertarEventos;
const modificarEventos = (id, evento) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando evento");
    // Verificar si el evento existe antes de intentar modificarlo
    const eventoExistente = yield prisma.eventos.findUnique({
        where: { id_evento: id }
    });
    if (!eventoExistente) {
        throw new Error(`El Evento con ID ${id} no existe.`);
    }
    // Luego, valida si la categoria  existe 
    // Se asume que idCategoria es obligatorio para modificar, si no, deberías hacer un chequeo de `if (evento.idCategoria)`
    const categoria = yield verificarCategoriaExistente(evento.idCategoria);
    if (!categoria) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`La categoria con ID ${evento.idCategoria} no existe.`);
    }
    const eventoActualizado = Object.assign({}, evento);
    yield prisma.eventos.update({
        where: {
            id_evento: id
        },
        data: (0, eventos_mapper_1.toPrismaEventos)(eventoActualizado)
    });
    return constants_1.RESPONSE_UPDATE_OK;
});
exports.modificarEventos = modificarEventos;
const eliminarEventos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando evento");
    // Verificar si el evento existe antes de intentar eliminarla
    const eventoExistente = yield prisma.eventos.findUnique({
        where: { id_evento: id }
    });
    if (!eventoExistente) {
        throw new Error(`El Evento con ID ${id} no existe.`);
    }
    yield prisma.eventos.update({
        where: {
            id_evento: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return constants_1.RESPONSE_DELETE_OK;
});
exports.eliminarEventos = eliminarEventos;
// NUEVA FUNCIÓN DE AYUDA para validar la existencia de la categoria
const verificarCategoriaExistente = (id_categoria) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield prisma.categorias.findUnique({
        where: {
            id_categoria: id_categoria,
        },
    });
    return categoria;
});
