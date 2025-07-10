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
exports.default = router;
