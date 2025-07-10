import express, {Router } from "express";
import { loginAuth } from "../auth/auth.controller";
import { authMiddleware } from "../auth/auth.midleware";
import { registerUser } from "../auth/auth.service";

const router: Router = express.Router();

/** 
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Gestion de Auth
 */


// Ruta para login
router.post('/', loginAuth); // login


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

router.post('/register', registerUser); // registro
router.get('/perfil', authMiddleware, (req, res) => {
  const user = (req as any).user;
  res.json({ message: 'Usuario autenticado', user });
});
export default router;
