"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagos_controller_1 = require("../controllers/pagos.controller");
const auth_midleware_1 = require("../auth/auth.midleware");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Pagos
 *     description: Gestion de Pagos
 */
/**
 * @swagger
 * /api/v1/pagos:
 *   get:
 *     summary: Listar todos los pagos
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */
router.get('/', auth_midleware_1.authMiddleware, pagos_controller_1.listarPagos);
/**
 * @swagger
 * /api/v1/pagos/{id}:
 *   get:
 *     summary: Obtener un pago por ID
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pago a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pago obtenido correctamente
 */
router.get('/:id', auth_midleware_1.authMiddleware, pagos_controller_1.obtenerPagos);
/**
 * @swagger
 * /api/v1/pagos:
 *   post:
 *     summary: Crear un nuevo pago
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idEvento
 *               - idUsuario
 *               - monto
 *               - metodoPago
 *             properties:
 *               idEvento:
 *                 type: integer
 *               idUsuario:
 *                 type: integer
 *               monto:
 *                 type: number
 *               metodoPago:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pago creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', auth_midleware_1.authMiddleware, pagos_controller_1.insertarPagos);
/**
 * @swagger
 * /api/v1/pagos/{id}:
 *   put:
 *     summary: Modificar un pago existente
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idEvento
 *               - idUsuario
 *               - monto
 *               - metodoPago
 *               - estado
 *             properties:
 *               idEvento:
 *                 type: integer
 *               idUsuario:
 *                 type: integer
 *               monto:
 *                 type: number
 *               metodoPago:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', auth_midleware_1.authMiddleware, pagos_controller_1.modificarPagos);
router.delete('/:id', auth_midleware_1.authMiddleware, pagos_controller_1.eliminarPagos);
exports.default = router;
