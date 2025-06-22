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
exports.eliminarCitaController = exports.actualizarCitaController = exports.crearCitaController = exports.listarCitaController = void 0;
const citaservice = __importStar(require("../services/cita.service"));
const listarCitaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Listar Citas");
    try {
        const citas = yield citaservice.listarCita();
        res.json(citas);
    }
    catch (error) {
        console.error("Error al listar citas:", error);
        res.status(500).json({ error: "Error al listar las citas" });
    }
});
exports.listarCitaController = listarCitaController;
const crearCitaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Crear Cita");
    try {
        const cita = req.body;
        const nuevaCita = yield citaservice.crearCita(cita);
        res.status(201).json(nuevaCita);
    }
    catch (error) {
        console.error("Error al crear cita:", error);
        res.status(500).json({ error: "Error al crear la cita" });
    }
});
exports.crearCitaController = crearCitaController;
const actualizarCitaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Actualizar Cita");
    try {
        const { id } = req.params;
        const cita = req.body;
        const citaActualizada = yield citaservice.actualizarCita(id, cita);
        res.json(citaActualizada);
    }
    catch (error) {
        console.error("Error al actualizar cita:", error);
        res.status(500).json({ error: "Error al actualizar la cita" });
    }
});
exports.actualizarCitaController = actualizarCitaController;
const eliminarCitaController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Eliminar Cita");
    try {
        const { id } = req.params;
        const citaEliminada = yield citaservice.eliminarCita(id);
        res.json(citaEliminada);
    }
    catch (error) {
        console.error("Error al eliminar cita:", error);
        res.status(500).json({ error: "Error al eliminar la cita" });
    }
});
exports.eliminarCitaController = eliminarCitaController;
