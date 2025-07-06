import express,{ Router } from "express";
import { listarAsistencias, obtenerAsistencias, insertarAsistencias, modificarAsistencias, eliminarAsistencias } from "../controllers/asistencias.controller";
import { authMiddleware } from "../auth/auth.midleware";

const router: Router = express.Router();

router.get('/', authMiddleware,listarAsistencias);
router.get('/:id', authMiddleware,obtenerAsistencias);
router.post('/', authMiddleware,insertarAsistencias);
router.put('/:id', authMiddleware,modificarAsistencias);
router.delete('/:id',authMiddleware, eliminarAsistencias);


export default router;