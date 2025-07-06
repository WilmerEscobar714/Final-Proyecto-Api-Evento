export interface Asistencia {
 idAsistencia: number;
 idUsuario: number;
 telefono: string;
 asistio?: string;
 estadoAuditoria: string;
 fechaRegistro: Date;
 fecha_actualizacion: Date
}