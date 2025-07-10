import express,{ Router } from "express";
import { listarAsistencias, obtenerAsistencias, insertarAsistencias, modificarAsistencias, eliminarAsistencias } from "../controllers/asistencias.controller";
import { authMiddleware } from "../auth/auth.midleware";

const router: Router = express.Router();

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

router.get('/', authMiddleware,listarAsistencias);

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

router.get('/:id', authMiddleware,obtenerAsistencias);

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

router.post('/', authMiddleware,insertarAsistencias);

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
router.put('/:id', authMiddleware,modificarAsistencias);

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

router.delete('/:id',authMiddleware, eliminarAsistencias);


export default router;