import { estado_pago_enum, metodo_pago_enum } from "@prisma/client";

export interface Pago {
    idPago: number;
    idEvento: number;
    idUsuario: number;
    monto: number;
    fechaPago: Date;
    metodoPago: metodo_pago_enum;
    estado: estado_pago_enum;  
    estadoAuditoria?: string;
    fechaActualizacion?: Date;
}