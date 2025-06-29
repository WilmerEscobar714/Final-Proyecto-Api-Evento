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
    yield prisma.pagos.create({
        data: (0, pagos_mapper_1.toPrismaPagos)(pago)
    });
    return constants_1.RESPONSE_INSERT_OK;
});
exports.insertarPagos = insertarPagos;
const modificarPagos = (id, pago) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando pago");
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
