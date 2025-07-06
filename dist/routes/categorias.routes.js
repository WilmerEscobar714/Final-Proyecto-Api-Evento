"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categorias_controller_1 = require("../controllers/categorias.controller");
const auth_midleware_1 = require("../auth/auth.midleware");
const router = express_1.default.Router();
router.get('/', auth_midleware_1.authMiddleware, categorias_controller_1.listarCategorias);
router.get('/:id', auth_midleware_1.authMiddleware, categorias_controller_1.obtenerCategorias);
router.post('/', auth_midleware_1.authMiddleware, categorias_controller_1.insertarCategorias);
router.put('/:id', auth_midleware_1.authMiddleware, categorias_controller_1.modificarCategorias);
router.delete('/:id', auth_midleware_1.authMiddleware, categorias_controller_1.eliminarCategorias);
exports.default = router;
