"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const resposeModel_1 = require("../shared/resposeModel");
const constants_1 = require("../shared/constants");
const usuariosService = __importStar(require("../services/usuarios.service"));
const usuariosSchema_1 = require("../schemas/usuariosSchema");
const listarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando usuarios...");
    try {
        const usuarios = yield usuariosService.listarUsuarios();
        res.json(resposeModel_1.ResponseModel.success(usuarios));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.listarUsuarios = listarUsuarios;
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo usuario por ID...");
    try {
        const { id } = req.params;
        const usuario = yield usuariosService.obtenerUsuarios(Number(id));
        res.json(resposeModel_1.ResponseModel.success(usuario));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
const insertarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nuevo usuario...");
    const { error } = usuariosSchema_1.usuariosCrearSchema.validate(req.body);
    if (error) {
        return res.status(constants_1.STATUS_BAD_REQUEST).json(resposeModel_1.ResponseModel.error(error.message, constants_1.STATUS_BAD_REQUEST));
    }
    try {
        const usuarioCreado = yield usuariosService.insertarUsuarios(req.body);
        res.status(201).json(resposeModel_1.ResponseModel.success(usuarioCreado));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.insertarUsuarios = insertarUsuarios;
const modificarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando usuario...");
    try {
        const { id } = req.params;
        const usuarioModificado = yield usuariosService.modificarUsuarios(Number(id), req.body);
        res.json(resposeModel_1.ResponseModel.success(usuarioModificado));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.modificarUsuarios = modificarUsuarios;
const eliminarUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando usuario...");
    try {
        const { id } = req.params;
        const usuarioEliminado = yield usuariosService.eliminarUsuarios(Number(id));
        res.json(resposeModel_1.ResponseModel.success(usuarioEliminado));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.eliminarUsuarios = eliminarUsuarios;
