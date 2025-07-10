import express,{ Router } from "express";

import { listarPagos, obtenerPagos, insertarPagos, modificarPagos, eliminarPagos } from "../controllers/pagos.controller";
import { authMiddleware } from "../auth/auth.midleware";

const router: Router = express.Router();

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

router.get('/', authMiddleware,listarPagos);


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

router.get('/:id',authMiddleware, obtenerPagos);

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

router.post('/', authMiddleware,insertarPagos);

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
 *         description: Pago actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pago no encontrado
 */

router.put('/:id', authMiddleware,modificarPagos);


/**
 * @swagger
 * /api/v1/pagos/{id}:
 *   delete:
 *     summary: Eliminar un pago por ID
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago a eliminar
 *     responses:
 *       200:
 *         description: Pago eliminado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pago no encontrado
 */

router.delete('/:id', authMiddleware,eliminarPagos);


export default router;