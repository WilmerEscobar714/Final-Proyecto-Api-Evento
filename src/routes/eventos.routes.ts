import express,{ Router } from "express";
import { listarEventos, obtenerEventos, insertarEventos, modificarEventos, eliminarEventos } from "../controllers/eventos.controller";



const router: Router = express.Router();

router.get('/', listarEventos);
router.get('/:id', obtenerEventos);
router.post('/', insertarEventos);
router.put('/:id', modificarEventos);
router.delete('/:id', eliminarEventos);


export default router;