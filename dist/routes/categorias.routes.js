"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categorias_controller_1 = require("../controllers/categorias.controller");
const router = express_1.default.Router();
router.get('/', categorias_controller_1.listarCategorias);
router.get('/:id', categorias_controller_1.obtenerCategorias);
router.post('/', categorias_controller_1.insertarCategorias);
router.put('/:id', categorias_controller_1.modificarCategorias);
router.delete('/:id', categorias_controller_1.eliminarCategorias);
exports.default = router;
