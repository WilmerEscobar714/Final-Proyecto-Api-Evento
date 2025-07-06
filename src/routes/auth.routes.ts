import express, {Router } from "express";
import { loginAuth } from "../auth/auth.controller";
import { authMiddleware } from "../auth/auth.midleware";
import { registerUser } from "../auth/auth.service";

const router: Router = express.Router();

// Ruta para login
router.post('/', loginAuth); // login
router.post('/register', registerUser); // registro
router.get('/perfil', authMiddleware, (req, res) => {
  const user = (req as any).user;
  res.json({ message: 'Usuario autenticado', user });
});
export default router;
