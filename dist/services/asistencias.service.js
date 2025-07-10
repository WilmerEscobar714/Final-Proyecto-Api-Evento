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
const asistencias_mapper_1 = require("../mappers/asistencias.mapper");
const prisma = new client_1.PrismaClient();
const listarAsistencias = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando asistencias");
    const asistencias = yield prisma.asistencias.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_asistencia: 'asc'
        }
    });
    return asistencias.map((asistencia) => (0, asistencias_mapper_1.fromPrismaAsistencias)(asistencia));
});
exports.listarAsistencias = listarAsistencias;
const obtenerAsistencias = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo asistencia por ID");
    // Verificar si asistencia existe antes de intentar obtenerlo
    const asistenciaExistente = yield prisma.asistencias.findUnique({
        where: { id_asistencia: id }
    });
    if (!asistenciaExistente) {
        throw new Error(`La asistencia con ID ${id} no existe.`);
    }
    const asistencia = yield prisma.asistencias.findUnique({
        where: {
            id_asistencia: id
        }
    });
    return asistencia ? (0, asistencias_mapper_1.fromPrismaAsistencias)(asistencia) : null;
});
exports.obtenerAsistencias = obtenerAsistencias;
const insertarAsistencias = (asistencia) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nueva asistencia");
    // Validar si el usuario existe
    const asistencias = yield verificarUsuarioExistente(asistencia.idUsuario);
    if (!asistencias) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El usuario con ID ${asistencia.idUsuario} no existe.`);
    }
    yield prisma.asistencias.create({
        data: (0, asistencias_mapper_1.toPrismaAsistencias)(asistencia)
    });
    return constants_1.RESPONSE_INSERT_OK;
});
exports.insertarAsistencias = insertarAsistencias;
const modificarAsistencias = (id, asistencia) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando asistencia");
    // Verificar si asistencia existe antes de intentar modificarlo
    const asistenciaExistente = yield prisma.asistencias.findUnique({
        where: { id_asistencia: id }
    });
    if (!asistenciaExistente) {
        throw new Error(`La asistencia con ID ${id} no existe.`);
    }
    // Luego, valida si el usuario  existe 
    // Se asume que idUsuario es obligatorio para modificar, si no, deberías hacer un chequeo de `if (asistencia.idUsuario)`
    const asistencias = yield verificarUsuarioExistente(asistencia.idUsuario);
    if (!asistencias) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El usuario con ID ${asistencia.idUsuario} no existe.`);
    }
    const asistenciaActualizada = Object.assign({}, asistencia);
    yield prisma.asistencias.update({
        where: {
            id_asistencia: id
        },
        data: (0, asistencias_mapper_1.toPrismaAsistencias)(asistenciaActualizada)
    });
    return constants_1.RESPONSE_UPDATE_OK;
});
exports.modificarAsistencias = modificarAsistencias;
const eliminarAsistencias = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando asistencia");
    // Verificar si asistencia existe antes de intentar eliminarlo
    const asistenciaExistente = yield prisma.asistencias.findUnique({
        where: { id_asistencia: id }
    });
    if (!asistenciaExistente) {
        throw new Error(`La asistencia con ID ${id} no existe.`);
    }
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
// NUEVA FUNCIÓN DE AYUDA para validar la existencia del usuarios
const verificarUsuarioExistente = (id_usuario) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield prisma.usuarios.findUnique({
        where: {
            id_usuario: id_usuario,
        },
    });
    return usuario;
});
