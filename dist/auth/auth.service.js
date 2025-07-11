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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserById = exports.listUsers = exports.registerUser = exports.loginAuth = void 0;
const constants_1 = require("../shared/constants");
const jwt_1 = require("./jwt");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const resposeModel_1 = require("../shared/resposeModel");
const prisma = new client_1.PrismaClient();
const loginAuth = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Buscar el usuario en la base de datos
    const user = yield prisma.users.findUnique({
        where: { username },
    });
    // Validar existencia del usuario y comparar contraseña
    if (!user)
        return constants_1.RESPONSE_CREDENCIALES_ERROR;
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid)
        return constants_1.RESPONSE_CREDENCIALES_ERROR;
    // Generar token con los datos del usuario
    const token = (0, jwt_1.signToken)({
        id: user.id,
        username: user.username,
        role: user.role,
    });
    return token;
});
exports.loginAuth = loginAuth;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = yield prisma.users.findUnique({ where: { username } });
        if (existingUser) {
            res.status(constants_1.STATUS_BAD_REQUEST).json(resposeModel_1.ResponseModel.error('El usuario ya existe'));
            return;
        }
        // Hashear contraseña
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Crear usuario en la base de datos
        const newUser = yield prisma.users.create({
            data: {
                username,
                password: hashedPassword,
                role: role || 'ADMINISTRADOR',
            },
        });
        res.status(constants_1.STATUS_CREATED).json(resposeModel_1.ResponseModel.success({ id: newUser.id, username: newUser.username, role: newUser.role }, 'Usuario registrado exitosamente'));
    }
    catch (error) {
        res.status(constants_1.STATUS_BAD_REQUEST).json(resposeModel_1.ResponseModel.error('Error al registrar usuario'));
    }
});
exports.registerUser = registerUser;
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todos los usuarios, seleccionando solo id, username y role para evitar exponer la contraseña
        const users = yield prisma.users.findMany({
            select: {
                id: true,
                username: true,
                password: true,
                role: true,
            },
        });
        res.status(constants_1.STATUS_OK).json(resposeModel_1.ResponseModel.success(users, 'Usuarios listados exitosamente'));
    }
    catch (error) {
        res.status(constants_1.STATUS_BAD_REQUEST).json(resposeModel_1.ResponseModel.error('Error al listar usuarios'));
    }
});
exports.listUsers = listUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Suponiendo que el ID viene en los parámetros de la URL
    try {
        // Primero, verifica si el usuario existe antes de intentar obtenerlo
        const existingUser = yield prisma.users.findUnique({
            where: { id: parseInt(id) },
        });
        if (!existingUser) {
            res.status(constants_1.STATUS_NOT_FOUND).json(resposeModel_1.ResponseModel.error('Usuario no encontrado'));
            return;
        }
        const user = yield prisma.users.findUnique({
            where: { id: parseInt(id) }, // Asegúrate de que el ID sea un número
            select: {
                id: true,
                username: true,
                password: true,
                role: true,
            },
        });
        if (!user) {
            res.status(constants_1.STATUS_NOT_FOUND).json(resposeModel_1.ResponseModel.error('Usuario no encontrado'));
            return;
        }
        res.status(constants_1.STATUS_OK).json(resposeModel_1.ResponseModel.success(user, 'Usuario obtenido exitosamente'));
    }
    catch (error) {
        res.status(constants_1.STATUS_BAD_REQUEST).json(resposeModel_1.ResponseModel.error('Error al obtener usuario'));
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Primero, verifica si el usuario existe antes de intentar eliminarlo
        const existingUser = yield prisma.users.findUnique({
            where: { id: parseInt(id) },
        });
        if (!existingUser) {
            res.status(constants_1.STATUS_NOT_FOUND).json(resposeModel_1.ResponseModel.error('Usuario no encontrado'));
            return;
        }
        // Elimina el usuario de la base de datos
        yield prisma.users.delete({
            where: { id: parseInt(id) },
        });
        // Envía una respuesta 200 OK con un mensaje de éxito
        res.status(constants_1.STATUS_OK).json(resposeModel_1.ResponseModel.success(null, 'Usuario eliminado satisfactoriamente'));
    }
    catch (error) {
        // En caso de error, puedes devolver un 400 Bad Request
        res.status(constants_1.STATUS_BAD_REQUEST).json(resposeModel_1.ResponseModel.error('Error al eliminar usuario'));
    }
});
exports.deleteUser = deleteUser;
