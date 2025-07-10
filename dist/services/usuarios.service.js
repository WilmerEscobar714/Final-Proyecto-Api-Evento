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
exports.eliminarUsuarios = exports.modificarUsuarios = exports.insertarUsuarios = exports.obtenerUsuarios = exports.listarUsuarios = void 0;
const client_1 = require("@prisma/client");
const constants_1 = require("../shared/constants");
const usuarios_mapper_1 = require("../mappers/usuarios.mapper");
const prisma = new client_1.PrismaClient();
const listarUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando usuarios");
    const usuarios = yield prisma.usuarios.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_usuario: 'asc'
        }
    });
    return usuarios.map((usuario) => (0, usuarios_mapper_1.fromPrismaUsuario)(usuario));
});
exports.listarUsuarios = listarUsuarios;
const obtenerUsuarios = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo usuario por ID");
    // Verificar si el usuario existe antes de intentar obtenerlo
    const usuarioExistente = yield prisma.usuarios.findUnique({
        where: { id_usuario: id }
    });
    if (!usuarioExistente) {
        throw new Error(`El Usuario con ID ${id} no existe.`);
    }
    const usuario = yield prisma.usuarios.findUnique({
        where: {
            id_usuario: id
        }
    });
    return usuario ? (0, usuarios_mapper_1.fromPrismaUsuario)(usuario) : null;
});
exports.obtenerUsuarios = obtenerUsuarios;
const insertarUsuarios = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nuevo usuario");
    // Validar si el evento existe
    const usuarios = yield verificarEventoExistente(usuario.idEvento);
    if (!usuarios) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El evento con ID ${usuario.idEvento} no existe.`);
    }
    yield prisma.usuarios.create({
        data: (0, usuarios_mapper_1.toPrismaUsuario)(usuario)
    });
    return constants_1.RESPONSE_INSERT_OK;
});
exports.insertarUsuarios = insertarUsuarios;
const modificarUsuarios = (id, usuario) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando usuario");
    // Verificar si el usuario existe antes de intentar modificarlo
    const usuarioExistente = yield prisma.usuarios.findUnique({
        where: { id_usuario: id }
    });
    if (!usuarioExistente) {
        throw new Error(`El Usuario con ID ${id} no existe.`);
    }
    // Luego, valida si el evento  existe 
    // Se asume que idEvento es obligatorio para modificar, si no, deberías hacer un chequeo de `if (usuario.idEvento)`
    const usuarios = yield verificarEventoExistente(usuario.idEvento);
    if (!usuarios) {
        // Lanza un error que el controlador pueda capturar
        throw new Error(`El evento con ID ${usuario.idEvento} no existe.`);
    }
    const usuarioActualizado = Object.assign({}, usuario);
    yield prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: (0, usuarios_mapper_1.toPrismaUsuario)(usuarioActualizado)
    });
    return constants_1.RESPONSE_UPDATE_OK;
});
exports.modificarUsuarios = modificarUsuarios;
const eliminarUsuarios = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando usuario");
    // Verificar si el usuario existe antes de intentar eliminarlo
    const usuarioExistente = yield prisma.usuarios.findUnique({
        where: { id_usuario: id }
    });
    if (!usuarioExistente) {
        throw new Error(`El Usuario con ID ${id} no existe.`);
    }
    yield prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: {
            estado_auditoria: '0'
        }
    });
    return constants_1.RESPONSE_DELETE_OK;
});
exports.eliminarUsuarios = eliminarUsuarios;
// NUEVA FUNCIÓN DE AYUDA para validar la existencia del evento
const verificarEventoExistente = (id_evento) => __awaiter(void 0, void 0, void 0, function* () {
    const evento = yield prisma.eventos.findUnique({
        where: {
            id_evento: id_evento,
        },
    });
    return evento;
});
