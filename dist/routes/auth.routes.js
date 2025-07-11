"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../auth/auth.controller");
const auth_midleware_1 = require("../auth/auth.midleware");
const auth_service_1 = require("../auth/auth.service");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Gestion de Auth
 */
// Ruta para login
router.post('/', auth_controller_1.loginAuth); // login
/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Crea un nuevo token de usuario
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: token creado correctamente
 */
/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Crea un nuevo users
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: users creado correctamente
 */
router.post('/register', auth_service_1.registerUser); // registro
router.get('/perfil', auth_midleware_1.authMiddleware, (req, res) => {
    const user = req.user;
    res.json({ message: 'Usuario autenticado', user });
});
/**
 * @swagger
 * /api/v1/auth/users:
 *   get:
 *     summary: Listar todos los users
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */
router.get('/users', auth_midleware_1.authMiddleware, auth_service_1.listUsers);
/**
 * @swagger
 * /api/v1/auth/users/{id}:
 *   get:
 *     summary: Obtener un User por ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del User a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User obtenido correctamente
 */
router.get('/users/:id', auth_midleware_1.authMiddleware, auth_service_1.getUserById);
/**
 * @swagger
 * /api/v1/auth/users/{id}:
 *   delete:
 *     summary: Eliminar un user por ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de user a eliminar
 *     responses:
 *       200:
 *         description: User eliminada correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: User no encontrado
 */
router.delete('/users/:id', auth_midleware_1.authMiddleware, auth_service_1.deleteUser);
exports.default = router;
