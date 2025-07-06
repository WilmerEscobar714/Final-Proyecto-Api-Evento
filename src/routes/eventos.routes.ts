import express,{ Router } from "express";
import { listarEventos, obtenerEventos, insertarEventos, modificarEventos, eliminarEventos } from "../controllers/eventos.controller";
import { authMiddleware } from "../auth/auth.midleware";



const router: Router = express.Router();

router.get('/', authMiddleware,listarEventos);
router.get('/:id', authMiddleware,obtenerEventos);
router.post('/', authMiddleware,insertarEventos);
router.put('/:id', authMiddleware,modificarEventos);
router.delete('/:id',authMiddleware, eliminarEventos);


export default router;