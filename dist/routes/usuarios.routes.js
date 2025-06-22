"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const router = express_1.default.Router();
router.get('/', usuarios_controller_1.listarUsuarios);
router.get('/:id', usuarios_controller_1.obtenerUsuarios);
router.post('/', usuarios_controller_1.insertarUsuarios);
router.put('/:id', usuarios_controller_1.modificarUsuarios);
router.delete('/:id', usuarios_controller_1.eliminarUsuarios);
exports.default = router;
