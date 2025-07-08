"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventos_controller_1 = require("../controllers/eventos.controller");
const auth_midleware_1 = require("../auth/auth.midleware");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Eventos
 *     description: Gestion de Eventos y Asistencias
 */
/**
 * @swagger
 * /api/v1/eventos:
 *   get:
 *     summary: Listar todos los eventos
 *     tags: [evento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */
router.get('/', auth_midleware_1.authMiddleware, eventos_controller_1.listarEventos);
router.get('/:id', auth_midleware_1.authMiddleware, eventos_controller_1.obtenerEventos);
router.post('/', auth_midleware_1.authMiddleware, eventos_controller_1.insertarEventos);
router.put('/:id', auth_midleware_1.authMiddleware, eventos_controller_1.modificarEventos);
router.delete('/:id', auth_midleware_1.authMiddleware, eventos_controller_1.eliminarEventos);
exports.default = router;
