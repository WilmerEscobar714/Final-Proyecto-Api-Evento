import express,{ Router } from "express";
import { listarUsuarios, obtenerUsuarios, insertarUsuarios, modificarUsuarios, eliminarUsuarios } from "../controllers/usuarios.controller";

const router: Router = express.Router();

router.get('/', listarUsuarios);
router.get('/:id', obtenerUsuarios);
router.post('/', insertarUsuarios);
router.put('/:id', modificarUsuarios);
router.delete('/:id', eliminarUsuarios);


export default router;