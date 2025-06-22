"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventos_controller_1 = require("../controllers/eventos.controller");
const router = express_1.default.Router();
router.get('/', eventos_controller_1.listarEventos);
router.get('/:id', eventos_controller_1.obtenerEventos);
router.post('/', eventos_controller_1.insertarEventos);
router.put('/:id', eventos_controller_1.modificarEventos);
router.delete('/:id', eventos_controller_1.eliminarEventos);
exports.default = router;
