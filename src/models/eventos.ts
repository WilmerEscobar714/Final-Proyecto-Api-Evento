export interface Evento {
    idEvento: number;
    idCategoria: number;
    nombre: string;
    descripcion: string;
    lugar: string;
    fecha: string;
    hora: string;
    estadoAuditoria?: string;
    fechaCreacion?: Date;  
   fechaActualizacion?: Date;
}