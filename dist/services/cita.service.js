"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCita = exports.actualizarCita = exports.crearCita = exports.listarCita = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const listarCita = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('citaService::listarCitas');
    const Citas = yield prisma.cita.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return Citas;
});
exports.listarCita = listarCita;
const crearCita = (cita) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('citaService::crearCita', cita);
    const nuevaCita = yield prisma.cita.create({
        data: cita
    });
    return nuevaCita;
});
exports.crearCita = crearCita;
const actualizarCita = (id, cita) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('citaService::actualizarCita', id, cita);
    const citaActualizada = yield prisma.cita.update({
        where: { id },
        data: cita
    });
    return citaActualizada;
});
exports.actualizarCita = actualizarCita;
const eliminarCita = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('citaService::eliminarCita', id);
    const citaEliminada = yield prisma.cita.delete({
        where: { id }
    });
    return citaEliminada;
});
exports.eliminarCita = eliminarCita;
