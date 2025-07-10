import express,{ Router } from "express";
import { listarEventos, obtenerEventos, insertarEventos, modificarEventos, eliminarEventos } from "../controllers/eventos.controller";
import { authMiddleware } from "../auth/auth.midleware";



const router: Router = express.Router();

/** 
 * @swagger
 * tags:
 *   - name: Eventos
 *     description: Gestion de Eventos
 */

/**
 * @swagger
 * /api/v1/eventos:
 *   get:
 *     summary: Listar todos los eventos
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

router.get('/', authMiddleware,listarEventos);

/**
 * @swagger
 * /api/v1/eventos/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del evento a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipo de evento obtenido correctamente
 */

router.get('/:id', authMiddleware,obtenerEventos);

/**
 * @swagger
 * /api/v1/eventos:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCategoria
 *               - nombre
 *               - descripcion
 *               - lugar
 *               - fecha
 *               - hora
 *             properties:
 *               idCategoria:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               lugar:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *                 format: time
 *     responses:
 *       201:
 *         description: Evento creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */

router.post('/', authMiddleware,insertarEventos);

/**
 * @swagger
 * /api/v1/eventos/{id}:
 *   put:
 *     summary: Modificar un evento existente
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idCategoria
 *               - nombre
 *               - descripcion
 *               - lugar
 *               - fecha
 *               - hora
 *             properties:
 *               idCategoria:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               lugar:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               hora:
 *                 type: string
 *                 format: time
 *     responses:
 *       200:
 *         description: Evento actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Evento no encontrado
 */

router.put('/:id', authMiddleware,modificarEventos);

/**
 * @swagger
 * /api/v1/eventos/{id}:
 *   delete:
 *     summary: Eliminar un evento por ID
 *     tags: [Eventos]
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
 *         description: Evento eliminado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Evento no encontrado
 */


router.delete('/:id',authMiddleware, eliminarEventos);


export default router;