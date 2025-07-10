import express,{ Router } from "express";
import { listarCategorias,obtenerCategorias,insertarCategorias,modificarCategorias,eliminarCategorias } from "../controllers/categorias.controller";
import { authMiddleware } from "../auth/auth.midleware";



const router: Router = express.Router();

/** 
 * @swagger
 * tags:
 *   - name: Categorias
 *     description: Gestion de Categorias
 */

/**
 * @swagger
 * /api/v1/categorias:
 *   get:
 *     summary: Listar todas las categorias
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

router.get('/', authMiddleware,listarCategorias);


/**
 * @swagger
 * /api/v1/categorias/{id}:
 *   get:
 *     summary: Obtener una categoria por ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoria a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: categoria obtenido correctamente
 */

router.get('/:id', authMiddleware,obtenerCategorias);

/**
 * @swagger
 * /api/v1/categorias:
 *   post:
 *     summary: Crear una nuevo categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: categoria creado correctamente
 */

router.post('/', authMiddleware,insertarCategorias);


/**
 * @swagger
 * /api/v1/categorias/{id}:
 *   put:
 *     summary: Modificar una categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: categoria modificada correctamente
 */
router.put('/:id',authMiddleware, modificarCategorias);

/**
 * @swagger
 * /api/v1/categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoria por ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoria a eliminar
 *     responses:
 *       200:
 *         description: categoria eliminada correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: categoria no encontrado
 */

router.delete('/:id', authMiddleware,eliminarCategorias);


export default router;