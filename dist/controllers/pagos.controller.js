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
exports.eliminarPagos = exports.modificarPagos = exports.insertarPagos = exports.obtenerPagos = exports.listarPagos = void 0;
const resposeModel_1 = require("../shared/resposeModel");
const constants_1 = require("../shared/constants");
const pagosService = __importStar(require("../services/pagos.service"));
const pagosSchema_1 = require("../schemas/pagosSchema");
const listarPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listando pagos...");
    try {
        const pagos = yield pagosService.listarPagos();
        res.json(resposeModel_1.ResponseModel.success(pagos));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.listarPagos = listarPagos;
const obtenerPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Obteniendo pago por ID...");
    try {
        const { id } = req.params;
        const pago = yield pagosService.obtenerPagos(Number(id));
        res.json(resposeModel_1.ResponseModel.success(pago));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.obtenerPagos = obtenerPagos;
const insertarPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Insertando nuevo pago...");
    const { error } = pagosSchema_1.pagosCrearSchema.validate(req.body);
    if (error) {
        return res.status(constants_1.STATUS_BAD_REQUEST).json(resposeModel_1.ResponseModel.error(error.message, constants_1.STATUS_BAD_REQUEST));
    }
    try {
        const pagoCreado = yield pagosService.insertarPagos(req.body);
        res.status(201).json(resposeModel_1.ResponseModel.success(pagoCreado));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.insertarPagos = insertarPagos;
const modificarPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Modificando pago...");
    try {
        const { id } = req.params;
        const pagoModificado = yield pagosService.modificarPagos(Number(id), req.body);
        res.json(resposeModel_1.ResponseModel.success(pagoModificado));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.modificarPagos = modificarPagos;
const eliminarPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminando pago...");
    try {
        const { id } = req.params;
        const pagoEliminado = yield pagosService.eliminarPagos(Number(id));
        res.json(resposeModel_1.ResponseModel.success(pagoEliminado));
    }
    catch (error) {
        console.error(error.message);
        res.status(constants_1.STATUS_INTERNAL_SERVER_ERROR).json(resposeModel_1.ResponseModel.error(error.message));
    }
});
exports.eliminarPagos = eliminarPagos;
