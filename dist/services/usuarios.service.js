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
const prisma = new client_1.PrismaClient();
const listarUsuarios = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando usuarios");
    return yield prisma.usuarios.findMany({
        where: {
            estado_auditoria: '1'
        },
        orderBy: {
            id_usuario: 'asc'
        }
    });
});
exports.listarUsuarios = listarUsuarios;
const obtenerUsuarios = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo usuario por ID");
    const usuario = yield prisma.usuarios.findUnique({
        where: {
            id_usuario: id
        }
    });
    return usuario;
});
exports.obtenerUsuarios = obtenerUsuarios;
const insertarUsuarios = (usuario) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nuevo usuario");
    yield prisma.usuarios.create({
        data: {
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            dni: usuario.dni
        }
    });
    return constants_1.RESPONSE_INSERT_OK;
});
exports.insertarUsuarios = insertarUsuarios;
const modificarUsuarios = (id, usuario) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando usuario");
    yield prisma.usuarios.update({
        where: {
            id_usuario: id
        },
        data: {
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            dni: usuario.dni
        }
    });
    return constants_1.RESPONSE_UPDATE_OK;
});
exports.modificarUsuarios = modificarUsuarios;
const eliminarUsuarios = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando usuario");
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
