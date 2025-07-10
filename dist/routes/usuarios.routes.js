"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const auth_midleware_1 = require("../auth/auth.midleware");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gestion de Usuarios
 */
/**
 * @swagger
 * /api/v1/usuarios:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */
router.get('/', auth_midleware_1.authMiddleware, usuarios_controller_1.listarUsuarios);
/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: usuario obtenido correctamente
 */
router.get('/:id', auth_midleware_1.authMiddleware, usuarios_controller_1.obtenerUsuarios);
/**
 * @swagger
 * /api/v1/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
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
 *               - nombre
 *               - apellidos
 *               - correo
 *               - dni
 *             properties:
 *               idEvento:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *                 format: email
 *               dni:
 *                 type: string
 *                 pattern: '^[0-9]{8}$'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', auth_midleware_1.authMiddleware, usuarios_controller_1.insertarUsuarios);
/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   put:
 *     summary: Modificar un usuario existente
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idEvento
 *               - nombre
 *               - apellidos
 *               - correo
 *               - dni
 *             properties:
 *               idEvento:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               correo:
 *                 type: string
 *                 format: email
 *               dni:
 *                 type: string
 *                 pattern: '^[0-9]{8}$'
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
router.put('/:id', auth_midleware_1.authMiddleware, usuarios_controller_1.modificarUsuarios);
/**
 * @swagger
 * /api/v1/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', auth_midleware_1.authMiddleware, usuarios_controller_1.eliminarUsuarios);
exports.default = router;
