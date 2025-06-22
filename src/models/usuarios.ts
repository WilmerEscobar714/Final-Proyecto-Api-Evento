export interface Usuario {
    id_usuario: number;
    nombre: string;
    apellidos: string;
    correo: string;
    dni: string;
    estado_auditoria?: string;
    fecha_creacion?: Date;
}