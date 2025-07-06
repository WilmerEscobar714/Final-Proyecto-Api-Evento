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
exports.registerUser = exports.loginAuth = void 0;
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
