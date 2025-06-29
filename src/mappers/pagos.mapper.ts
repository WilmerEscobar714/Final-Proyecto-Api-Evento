import { pagos } from "@prisma/client";
import { Pago } from "../models/pagos";


export const fromPrismaPagos = (pago:pagos) =>{
    return{
        idPago: pago.id_pago,
        idEvento: pago.id_evento,
        idUsuario: pago.id_usuario,
        monto: pago.monto,
        fechaPago: pago.fecha_pago,
        metodoPago: pago.metodo_pago,
        estado: pago.estado,
        estadoAuditoria: pago.estado_auditoria,
        fechaActualizacion: pago.fecha_actualizacion ? new Date(pago.fecha_actualizacion) : null
    }
}

export const toPrismaPagos = (pago:Pago)=>{
    return{
        id_evento:pago.idEvento,
        id_usuario:pago.idUsuario,
        monto:pago.monto,
        metodo_pago:pago.metodoPago,
        estado:pago.estado
    }
}