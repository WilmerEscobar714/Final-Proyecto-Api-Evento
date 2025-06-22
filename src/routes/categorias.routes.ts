import express,{ Router } from "express";
import { listarCategorias,obtenerCategorias,insertarCategorias,modificarCategorias,eliminarCategorias } from "../controllers/categorias.controller";



const router: Router = express.Router();

router.get('/', listarCategorias);
router.get('/:id', obtenerCategorias);
router.post('/', insertarCategorias);
router.put('/:id', modificarCategorias);
router.delete('/:id', eliminarCategorias);


export default router;