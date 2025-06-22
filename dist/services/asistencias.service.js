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
exports.eliminarAsistencias = exports.modificarAsistencias = exports.insertarAsistencias = exports.obtenerAsistencias = exports.listarAsistencias = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../shared/constants");
const prisma = new client_1.PrismaClient();
const listarAsistencias = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando asistencias");
    return yield prisma.asistencias.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_asistencia: 'asc'
        }
    });
});
exports.listarAsistencias = listarAsistencias;
const obtenerAsistencias = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo asistencia por ID");
    const asistencia = yield prisma.asistencias.findUnique({
        where: {
            id_asistencia: id
        }
    });
    return asistencia;
});
exports.obtenerAsistencias = obtenerAsistencias;
const insertarAsistencias = (asistencia) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nueva asistencia");
    yield prisma.asistencias.create({
        data: {
            id_evento: asistencia.id_evento,
            id_usuario: asistencia.id_usuario,
            nombres: asistencia.nombres,
            apellidos: asistencia.apellidos,
            correo: asistencia.correo,
            dni: asistencia.dni,
            telefono: asistencia.telefono
        }
    });
    return constants_1.RESPONSE_INSERT_OK;
});
exports.insertarAsistencias = insertarAsistencias;
const modificarAsistencias = (id, asistencia) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando asistencia");
    yield prisma.asistencias.update({
        where: {
            id_asistencia: id
        },
        data: {
            id_evento: asistencia.id_evento,
            id_usuario: asistencia.id_usuario,
            nombres: asistencia.nombres,
            apellidos: asistencia.apellidos,
            correo: asistencia.correo,
            dni: asistencia.dni,
            telefono: asistencia.telefono
        }
    });
    return constants_1.RESPONSE_UPDATE_OK;
});
exports.modificarAsistencias = modificarAsistencias;
const eliminarAsistencias = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando asistencia");
    yield prisma.asistencias.update({
        where: {
            id_asistencia: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return constants_1.RESPONSE_DELETE_OK;
});
exports.eliminarAsistencias = eliminarAsistencias;
