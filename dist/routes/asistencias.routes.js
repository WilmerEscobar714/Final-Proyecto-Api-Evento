"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asistencias_controller_1 = require("../controllers/asistencias.controller");
const auth_midleware_1 = require("../auth/auth.midleware");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Asistencias
 *     description: Gestion de Usuarios
 */
/**
 * @swagger
 * /api/v1/asistencias:
 *   get:
 *     summary: Listar todos las asistencias
 *     tags: [Asistencias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */
router.get('/', auth_midleware_1.authMiddleware, asistencias_controller_1.listarAsistencias);
/**
 * @swagger
 * /api/v1/asistencias/{id}:
 *   get:
 *     summary: Obtener una asistencia por ID
 *     tags: [Asistencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la asistencia a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: asistencia obtenido correctamente
 */
router.get('/:id', auth_midleware_1.authMiddleware, asistencias_controller_1.obtenerAsistencias);
/**
 * @swagger
 * /api/v1/asistencias:
 *   post:
 *     summary: Crear una asistencia
 *     tags: [Asistencias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idUsuario
 *               - telefono
 *             properties:
 *               idUsuario:
 *                 type: integer
 *               telefono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', auth_midleware_1.authMiddleware, asistencias_controller_1.insertarAsistencias);
/**
 * @swagger
 * /api/v1/asistencias/{id}:
 *   put:
 *     summary: Modificar una asistencia por ID
 *     tags: [Asistencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la asistencia a modificar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: integer
 *               telefono:
 *                 type: string
 *               asistio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Asistencia modificada correctamente
 */
router.put('/:id', auth_midleware_1.authMiddleware, asistencias_controller_1.modificarAsistencias);
/**
 * @swagger
 * /api/v1/asistencias/{id}:
 *   delete:
 *     summary: Eliminar una asistencia por ID
 *     tags: [Asistencias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la asistencia a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asistencia eliminada correctamente
 */
router.delete('/:id', auth_midleware_1.authMiddleware, asistencias_controller_1.eliminarAsistencias);
exports.default = router;
