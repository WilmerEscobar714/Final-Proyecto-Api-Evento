"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asistencias_controller_1 = require("../controllers/asistencias.controller");
const auth_midleware_1 = require("../auth/auth.midleware");
const router = express_1.default.Router();
router.get('/', auth_midleware_1.authMiddleware, asistencias_controller_1.listarAsistencias);
router.get('/:id', auth_midleware_1.authMiddleware, asistencias_controller_1.obtenerAsistencias);
router.post('/', auth_midleware_1.authMiddleware, asistencias_controller_1.insertarAsistencias);
router.put('/:id', auth_midleware_1.authMiddleware, asistencias_controller_1.modificarAsistencias);
router.delete('/:id', auth_midleware_1.authMiddleware, asistencias_controller_1.eliminarAsistencias);
exports.default = router;
