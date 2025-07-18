import express, {Router } from "express";
import { loginAuth } from "../auth/auth.controller";
import { authMiddleware } from "../auth/auth.midleware";
import { deleteUser, getUserById, listUsers, registerUser } from "../auth/auth.service";

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

router.get('/users', authMiddleware, listUsers);

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
router.get('/users/:id', authMiddleware, getUserById);

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
router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
