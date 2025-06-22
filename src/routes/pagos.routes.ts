import express,{ Router } from "express";

import { listarPagos, obtenerPagos, insertarPagos, modificarPagos, eliminarPagos } from "../controllers/pagos.controller";

const router: Router = express.Router();

router.get('/', listarPagos);
router.get('/:id', obtenerPagos);
router.post('/', insertarPagos);
router.put('/:id', modificarPagos);
router.delete('/:id', eliminarPagos);


export default router;