import express,{ Router } from "express";
import { listarAsistencias, obtenerAsistencias, insertarAsistencias, modificarAsistencias, eliminarAsistencias } from "../controllers/asistencias.controller";

const router: Router = express.Router();

router.get('/', listarAsistencias);
router.get('/:id', obtenerAsistencias);
router.post('/', insertarAsistencias);
router.put('/:id', modificarAsistencias);
router.delete('/:id', eliminarAsistencias);


export default router;