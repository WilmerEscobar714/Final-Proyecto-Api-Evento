"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cita_controller_1 = require("../controllers/cita.controller");
const router = express_1.default.Router();
router.get('/', cita_controller_1.listarCitaController);
exports.default = router;
