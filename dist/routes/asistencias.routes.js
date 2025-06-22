"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asistencias_controller_1 = require("../controllers/asistencias.controller");
const router = express_1.default.Router();
router.get('/', asistencias_controller_1.listarAsistencias);
router.get('/:id', asistencias_controller_1.obtenerAsistencias);
router.post('/', asistencias_controller_1.insertarAsistencias);
router.put('/:id', asistencias_controller_1.modificarAsistencias);
router.delete('/:id', asistencias_controller_1.eliminarAsistencias);
exports.default = router;
