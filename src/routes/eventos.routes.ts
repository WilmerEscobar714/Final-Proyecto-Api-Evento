import express,{ Router } from "express";
import { listarEventos, obtenerEventos, insertarEventos, modificarEventos, eliminarEventos } from "../controllers/eventos.controller";
import { authMiddleware } from "../auth/auth.midleware";



const router: Router = express.Router();

/** 
 * @swagger
 * tags:
 *   - name: Eventos
 *     description: Gestion de Eventos y Asistencias
 */

/**
 * @swagger
 * /api/v1/eventos:
 *   get:
 *     summary: Listar todos los eventos
 *     tags: [evento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 */

router.get('/', authMiddleware,listarEventos);
router.get('/:id', authMiddleware,obtenerEventos);
router.post('/', authMiddleware,insertarEventos);
router.put('/:id', authMiddleware,modificarEventos);
router.delete('/:id',authMiddleware, eliminarEventos);


export default router;