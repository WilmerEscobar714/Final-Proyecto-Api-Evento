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
exports.eliminarPagos = exports.modificarPagos = exports.insertarPagos = exports.obtenerPagos = exports.listarPagos = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../shared/constants");
const pagos_mapper_1 = require("../mappers/pagos.mapper");
const prisma = new client_1.PrismaClient();
const listarPagos = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando pagos");
    const pago = yield prisma.pagos.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_pago: 'asc'
        }
    });
    return pago.map((pagos) => (0, pagos_mapper_1.fromPrismaPagos)(pagos));
});
exports.listarPagos = listarPagos;
const obtenerPagos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo pago por ID");
    // Verificar si el pago existe antes de intentar obtenerlo
    const pagoExistente = yield prisma.pagos.findUnique({
        where: { id_pago: id }
    });
    if (!pagoExistente) {
        throw new Error(`El pago con ID ${id} no existe.`);
    }
    const pago = yield prisma.pagos.findUnique({
        where: {
            id_pago: id
        }
    });
    return pago ? (0, pagos_mapper_1.fromPrismaPagos)(pago) : null;
});
exports.obtenerPagos = obtenerPagos;
const insertarPagos = (pago) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nuevo pago");
    // Validar si el evento existe
    const pagoEvento = yield verificarEventoExistente(pago.idEvento);
    if (!pagoEvento) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El evento con ID ${pago.idEvento} no existe.`);
    }
    // Validar si el usuario existe
    const pagosUsuario = yield verificarUsuarioExistente(pago.idUsuario);
    if (!pagosUsuario) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El usuario con ID ${pago.idUsuario} no existe.`);
    }
    yield prisma.pagos.create({
        data: (0, pagos_mapper_1.toPrismaPagos)(pago)
    });
    return constants_1.RESPONSE_INSERT_OK;
});
exports.insertarPagos = insertarPagos;
const modificarPagos = (id, pago) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando pago");
    // Verificar si el pago existe antes de intentar modificarlo
    const pagoExistente = yield prisma.pagos.findUnique({
        where: { id_pago: id }
    });
    if (!pagoExistente) {
        throw new Error(`El pago con ID ${id} no existe.`);
    }
    // Luego, valida si el evento  existe 
    // Se asume que idEvento es obligatorio para modificar, si no, deberías hacer un chequeo de `if (pago.idEvento)`
    const pagoEvento = yield verificarEventoExistente(pago.idEvento);
    if (!pagoEvento) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El evento con ID ${pago.idEvento} no existe.`);
    }
    // Validar si el usuario existe
    const pagosUsuario = yield verificarUsuarioExistente(pago.idUsuario);
    if (!pagosUsuario) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El usuario con ID ${pago.idUsuario} no existe.`);
    }
    const pagoActualizado = Object.assign({}, pago);
    yield prisma.pagos.update({
        where: {
            id_pago: id
        },
        data: (0, pagos_mapper_1.toPrismaPagos)(pagoActualizado)
    });
    return constants_1.RESPONSE_UPDATE_OK;
});
exports.modificarPagos = modificarPagos;
const eliminarPagos = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando pago");
    // Verificar si el pago existe antes de intentar eliminarlo
    const pagoExistente = yield prisma.pagos.findUnique({
        where: { id_pago: id }
    });
    if (!pagoExistente) {
        throw new Error(`El pago con ID ${id} no existe.`);
    }
    yield prisma.pagos.update({
        where: {
            id_pago: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return constants_1.RESPONSE_DELETE_OK;
});
exports.eliminarPagos = eliminarPagos;
// NUEVA FUNCIÓN DE AYUDA para validar la existencia del evento
const verificarEventoExistente = (id_evento) => __awaiter(void 0, void 0, void 0, function* () {
    const evento = yield prisma.eventos.findUnique({
        where: {
            id_evento: id_evento,
        },
    });
    return evento;
});
// NUEVA FUNCIÓN DE AYUDA para validar la existencia del usuarios
const verificarUsuarioExistente = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const usu = yield prisma.usuarios.findUnique({
        where: {
            id_usuario: id_usuario,
        },
    });
    return usu;
});
