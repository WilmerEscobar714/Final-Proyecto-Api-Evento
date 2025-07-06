"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPrismaPagos = exports.fromPrismaPagos = void 0;
const fromPrismaPagos = (pago) => {
    return {
        idPago: pago.id_pago,
        idEvento: pago.id_evento,
        idUsuario: pago.id_usuario,
        monto: pago.monto,
        fechaPago: pago.fecha_pago,
        metodoPago: pago.metodo_pago,
        estado: pago.estado,
        estadoAuditoria: pago.estado_auditoria,
        fechaActualizacion: pago.fecha_actualizacion ? new Date(pago.fecha_actualizacion) : null
    };
};
exports.fromPrismaPagos = fromPrismaPagos;
const toPrismaPagos = (pago) => {
    return {
        id_evento: pago.idEvento,
        id_usuario: pago.idUsuario,
        monto: pago.monto,
        metodo_pago: pago.metodoPago,
        estado: pago.estado
    };
};
exports.toPrismaPagos = toPrismaPagos;
