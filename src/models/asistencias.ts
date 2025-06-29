export interface Asistencia {
 idAsistencia: number;
 idEvento: number;
 idUsuario: number;
 nombres: string;
 apellidos: string;
 correo: string;
 dni: string;
 telefono: string;
 asistio?: string;
 estadoAuditoria: string;
 fechaRegistro: Date;
 fecha_actualizacion: Date
}