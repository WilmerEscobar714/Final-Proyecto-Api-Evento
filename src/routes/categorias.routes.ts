import express,{ Router } from "express";
import { listarCategorias,obtenerCategorias,insertarCategorias,modificarCategorias,eliminarCategorias } from "../controllers/categorias.controller";
import { authMiddleware } from "../auth/auth.midleware";



const router: Router = express.Router();

router.get('/', authMiddleware,listarCategorias);
router.get('/:id', authMiddleware,obtenerCategorias);
router.post('/', authMiddleware,insertarCategorias);
router.put('/:id',authMiddleware, modificarCategorias);
router.delete('/:id', authMiddleware,eliminarCategorias);


export default router;