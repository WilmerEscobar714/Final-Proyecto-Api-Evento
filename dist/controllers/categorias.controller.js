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
exports.eliminarCategorias = exports.modificarCategorias = exports.insertarCategorias = exports.obtenerCategorias = exports.listarCategorias = void 0;
const resposeModel_1 = require("../shared/resposeModel");
const constants_1 = require("../shared/constants");
const categoriasService = __importStar(require("../services/categorias.service"));
const categoriasSchema_1 = require("../schemas/categoriasSchema");
const listarCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando categorias...");
    try {
        const categorias = yield categoriasService.listarCategorias();
        res.json(resposeModel_1.ResponseModel.success(categorias));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.listarCategorias = listarCategorias;
const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo categoria por ID...");
    try {
        const { id } = req.params;
        const categoria = yield categoriasService.obtenerCategorias(Number(id));
        res.json(resposeModel_1.ResponseModel.success(categoria));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.obtenerCategorias = obtenerCategorias;
const insertarCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nueva categoria...");
    const { error } = categoriasSchema_1.categoriasCrearSchema.validate(req.body);
    if (error) {
        return res.status(constants_1.STATUS_BAD_REQUEST).json(resposeModel_1.ResponseModel.error(error.message, constants_1.STATUS_BAD_REQUEST));
    }
    try {
        const categoriaCreada = yield categoriasService.insertarCategorias(req.body);
        res.status(201).json(resposeModel_1.ResponseModel.success(categoriaCreada));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.insertarCategorias = insertarCategorias;
const modificarCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando categoria...");
    try {
        const { id } = req.params;
        const categoriaModificada = yield categoriasService.modificarCategorias(Number(id), req.body);
        res.json(resposeModel_1.ResponseModel.success(categoriaModificada));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.modificarCategorias = modificarCategorias;
const eliminarCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando categoria...");
    try {
        const { id } = req.params;
        const categoriaEliminada = yield categoriasService.eliminarCategorias(Number(id));
        res.json(resposeModel_1.ResponseModel.success(categoriaEliminada));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.eliminarCategorias = eliminarCategorias;
