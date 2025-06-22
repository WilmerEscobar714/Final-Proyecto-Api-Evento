import { estado_pago_enum, metodo_pago_enum } from "@prisma/client";



export interface Pago {
    id_pago: number;
    id_evento: number;
    id_usuario: number;
    monto: number;
    fecha_pago: Date;
    metodo_pago: metodo_pago_enum;
    estado: estado_pago_enum;
    estado_auditoria: string;
}