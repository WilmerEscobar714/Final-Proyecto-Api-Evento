"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const auth_midleware_1 = require("../auth/auth.midleware");
const router = express_1.default.Router();
router.get('/', auth_midleware_1.authMiddleware, usuarios_controller_1.listarUsuarios);
router.get('/:id', auth_midleware_1.authMiddleware, usuarios_controller_1.obtenerUsuarios);
router.post('/', auth_midleware_1.authMiddleware, usuarios_controller_1.insertarUsuarios);
router.put('/:id', auth_midleware_1.authMiddleware, usuarios_controller_1.modificarUsuarios);
router.delete('/:id', auth_midleware_1.authMiddleware, usuarios_controller_1.eliminarUsuarios);
exports.default = router;
