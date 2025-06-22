"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagos_controller_1 = require("../controllers/pagos.controller");
const router = express_1.default.Router();
router.get('/', pagos_controller_1.listarPagos);
router.get('/:id', pagos_controller_1.obtenerPagos);
router.post('/', pagos_controller_1.insertarPagos);
router.put('/:id', pagos_controller_1.modificarPagos);
router.delete('/:id', pagos_controller_1.eliminarPagos);
exports.default = router;
