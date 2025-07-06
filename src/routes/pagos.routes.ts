import express,{ Router } from "express";

import { listarPagos, obtenerPagos, insertarPagos, modificarPagos, eliminarPagos } from "../controllers/pagos.controller";
import { authMiddleware } from "../auth/auth.midleware";

const router: Router = express.Router();

router.get('/', authMiddleware,listarPagos);
router.get('/:id',authMiddleware, obtenerPagos);
router.post('/', authMiddleware,insertarPagos);
router.put('/:id', authMiddleware,modificarPagos);
router.delete('/:id', authMiddleware,eliminarPagos);


export default router;