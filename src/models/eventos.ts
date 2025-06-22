export interface Evento {
    id_evento: number;
    id_categoria: number;
    nombre: string;
    descripcion: string;
    lugar: string;
    fecha: Date;
    hora: Date;
    estado_auditoria?: string;
    fecha_creacion?: Date;  
   fecha_actualizacion?: Date;
}