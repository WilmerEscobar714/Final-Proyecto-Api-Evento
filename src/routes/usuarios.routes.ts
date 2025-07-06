import express,{ Router } from "express";
import { listarUsuarios, obtenerUsuarios, insertarUsuarios, modificarUsuarios, eliminarUsuarios } from "../controllers/usuarios.controller";
import { authMiddleware } from "../auth/auth.midleware";

const router: Router = express.Router();

router.get('/', authMiddleware,listarUsuarios);
router.get('/:id', authMiddleware,obtenerUsuarios);
router.post('/', authMiddleware,insertarUsuarios);
router.put('/:id', authMiddleware,modificarUsuarios);
router.delete('/:id', authMiddleware,eliminarUsuarios);


export default router;