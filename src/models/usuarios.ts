export interface Usuario {
    idUsuario: number;
    idEvento: number;
    nombre: string;
    apellidos: string;
    correo: string;
    dni: string;
    estadoAuditoria?: string;
    fechaCreacion?: Date;
    fechaActualizacion?: Date;
}