<h1>API DE EVENTOS</h1>
<h3>🧩 Descripción General</h3>

<h4>La API de Eventos y Asistencias permite gestionar la creación, actualización y control de todas sus tablas. El proyecto esta diseñado para obtimizar los pagos, eventos, categorias, usuarios y asistencias.</h4>

<h3>🧰 Tecnologías Utilizadas</h3>

- Backend: Node.js + TypeScript.

-	Framework: Express.

-	ORM / DB : Prisma.

-	Base de datos: PostgresSQL.

-	Seguridad: Cors para restringir las solicitudes HTTP entre orígenes distintos.

-	Validación de datos: Usamos el joi para validación de datos que permite definir planos o esquemas.

-	Postman para pruebas.

-	GitHub

<h3>✅ Instrucciones de instalación y ejecución</h3>

Sigue estos pasos para instalar las dependencias y ejecutar el proyecto.

### 1. Prerequisitos

Asegúrate de tener instalado lo siguiente:

* **Node.js**: Versión 18 o superior (recomendado). Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

### 2. Configuración Inicial del Proyecto

Crea una carpeta para tu proyecto y navega dentro de ella desde tu terminal:

```bash
mkdir <nombre-de-proyecto>
cd <nombre-de-proyecto>
```

### 3. Inicializar el proyecto y configurar dependencias

```bash
npm init -y
npm install express cors dotenv bcrypt jsonwebtoken joi morgan @prisma/client swagger-jsdoc swagger-ui-express
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/jsonwebtoken @types/bcrypt @types/swagger-ui-express @types/swagger-jsdoc prisma
npx tsc --init
npx prisma init
```
### 4. Configuración de Variables de Entorno

Este proyecto utiliza variables de entorno (gracias a dotenv). Crea un archivo .env en la raíz del proyecto y configura las variables necesarias. Algunas variables comunes podrían ser:

**Ejemplo de .env (ajusta según las necesidades de tu proyecto)**

```ini
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
JWT_SECRET="tu_secreto_para_jwt"
PORT=3000
```

Asegúrate de configurar DATABASE_URL con la cadena de conexión de tu base de datos y JWT_SECRET con una cadena segura y aleatoria.

### 4. Configuración de la Base de Datos (Prisma)

Este proyecto usa Prisma para la base de datos.

Genera el Prisma Client para interactuar con la base de datos.

```bash
npx prisma generate
```

Sincroniza el esquema de Prisma con una base de datos existente.
 
```bash
npx prisma db pull
```

### 5. Ejecución del Proyecto

Puedes ejecutar el proyecto de las siguientes maneras:

 **Ejecutar en modo desarrollo**
 
 Para ejecutar el proyecto en modo de desarrollo con recarga en caliente (hot-reload) usando ts-node-dev:
 
 ```bash
 npm run dev
 ```

Esto iniciará el servidor y se reiniciará automáticamente cada vez que hagas cambios en los archivos fuente.

**Modo Producción (Compilado)**

Para compilar el proyecto a JavaScript puro y luego ejecutarlo (ideal para entornos de producción):

```bash
npm run build
npm run start
 ```

El comando npm run build compilará tu código TypeScript a JavaScript en la carpeta dist/. Luego, npm run start ejecutará la versión compilada del servidor.

### 5.  Acceso a la API

Una vez que el servidor esté en ejecución, tu API estará disponible en:

```bash
http://localhost:<PORT>
 ```

(Reemplaza <PORT> con el número de puerto que configuraste en tu archivo .env, por defecto 3000 si no se especifica)

### 5. Documentación de la API 

Para explorar y probar los endpoints de la API, puedes usar las siguientes herramientas:

Swagger UI

La documentación interactiva de Swagger estará disponible automáticamente cuando el servidor esté en ejecución en la siguiente URL:

```bash
http://localhost:3000/api/v1/api-docs/#/  -- falta poner url correcta
 ```

Postman 

```bash
falta poner 
 ```


<h3>📌 Rutas principales de la API</h3>

## Auth

### POST /api/v1/auth/register

Esta ruta crea un nuevo user.

**Ejemplo de Request Body:**

```json
{
  "username": "juan",
  "password": "admin"
}
```

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "status": 200,
  "data": {
    "id": 1,
    "username": "juan",
    "role": "ADMINISTRADOR"
  }
}
```

### POST /api/v1/auth

Esta ruta crea un token de usuario.

**Ejemplo de Request Body:**

```json
{
  "username": "juan",
  "password": "admin"
}
```

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJqdWFuIiwicm9sZSI6IkFETUlOSVNUUkFET1IiLCJpYXQiOjE3NTIxOTkwODEsImV4cCI6MTc1MjIwMjY4MX0.HH66lQcaiatNaH05T_22t5Nhpl34gIh4vvcFMpDkT8E"
  }
}
```

## Categorías

### POST /api/v1/categorias

Esta ruta permite crear una nueva categoría.

**Ejemplo de Request Body:**

```json
{
  "nombre": "Concierto"
}
```
**Ejemplo de Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Insertado satisfactoriamente"
}
```
### GET /api/v1/categorias

Esta ruta lista todas las categorias.

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": [
    {
      "idCategoria": 1,
      "nombre": "Concierto",
      "estadoAuditoria": "1",
      "fechaCreacion": "2025-06-28T21:32:31.045Z",
      "fechaActualizacion": null
    },
    {
      "idCategoria": 2,
      "nombre": "Cumpleaños",
      "estadoAuditoria": "1",
      "fechaCreacion": "2025-06-21T21:19:20.716Z",
      "fechaActualizacion":  null
    }
  ]
  }
```
### GET /api/v1/categorias/1

Esta ruta obtiene la categoria por ID.

**Parámetro de ruta:**

* `id`: ID de la categoría a obtener.
  
**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": {
    "idCategoria": 1,
    "nombre": "Concierto",
    "estadoAuditoria": "1",
    "fechaCreacion": "2025-06-28T21:32:31.045Z",
    "fechaActualizacion": null
  }
}
```
### PUT /api/v1/categorias/1

Esta ruta actualiza una categoria por ID.

**Parámetro de ruta:**

* `id`: ID de la categoria a actualizar.

**Ejemplo de Request Body:**

```json
{
  "nombre": "Cumpleaños"
}
```

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Modificado satisfactoriamente"
}
```

### DELETE /api/v1/categorias/1

Esta ruta elimina una categoria por ID.

**Parámetro de ruta:**

* `id`: ID de la categoría a eliminar.
  
**Ejemplo de Respuesta Exitosa (200 OK):**
  
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Eliminado satisfactoriamente"
}
```

## Eventos

### POST /api/v1/eventos

Esta ruta permite crear un nuevo evento.

**Ejemplo de Request Body:**

```json
{
  "idCategoria": 1,
  "nombre": "Concierto de Rock",
  "descripcion": "Disfruta de una noche de rock con la banda 'Los Electrones'.",
  "lugar": "Arena Lima",
  "fecha": "2025-07-11",
  "hora": "12:30"
}
```
**Ejemplo de Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Insertado satisfactoriamente"
}
```

### GET /api/v1/eventos

Esta ruta lista todos los eventos.

**Ejemplo de Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": [
    {
      "idEvento": 1,
      "idCategoria": 1,
      "nombre": "Concierto de Rock",
      "descripcion": "Disfruta de una noche de rock con la banda 'Los Electrones'.",
      "lugar": "Arena Lima",
      "fecha": "2025-07-11T00:00:00.000Z",
      "hora": "1970-01-01T12:30:00.000Z",
      "estadoAuditoria": "1",
      "fechaCreacion": "2025-07-11T02:06:10.149Z",
      "fechaActualizacion": null
    },
   {
      "idEvento": 2,
      "idCategoria": 1,
      "nombre": "Concierto de Pop",
      "descripcion": "Disfruta de una noche de pop",
      "lugar": "Arena Callao",
      "fecha": "2020-10-21T00:00:00.000Z",
      "hora": "1970-01-01T12:30:00.000Z",
      "estadoAuditoria": "1",
      "fechaCreacion": "2025-06-29T03:32:30.764Z",
      "fechaActualizacion": null
    },
  ]
 }
```

### GET /api/v1/eventos/1

Esta ruta obtiene un evento por ID.

**Parámetro de ruta:**

* `id`: ID del evento a obtener.

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": {
    "idEvento": 1,
    "idCategoria": 1,
    "nombre": "Concierto de Rock",
    "descripcion": "Disfruta de una noche de rock con la banda 'Los Electrones'.",
    "lugar": "Arena Lima",
    "fecha": "2025-07-11T00:00:00.000Z",
    "hora": "1970-01-01T12:30:00.000Z",
    "estadoAuditoria": "1",
    "fechaCreacion": "2025-07-11T02:06:10.149Z",
    "fechaActualizacion": null
  }
}
```

### PUT /api/v1/eventos/1

Esta ruta actualiza un evento por ID.

**Parámetro de ruta:**

* `id`: ID del evento a actualizar.

**Ejemplo de Request Body:**

```json
{
    "idCategoria": 1,
    "nombre": "Concierto de Pop",
    "descripcion": "Disfruta de una noche de Pop",
    "lugar": "Arena Lima",
    "fecha": "2025-06-20",
    "hora": "12:40"
}
```

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Modificado satisfactoriamente"
}
```

### DELETE /api/v1/eventos/1

Esta ruta elimina un evento por ID.

**Parámetro de ruta:**

* `id`: ID del evento a eliminar.
  
**Ejemplo de Respuesta Exitosa (200 OK):**
  
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Eliminado satisfactoriamente"
}
```

## Usuarios

### POST /api/v1/usuarios

Esta ruta permite crear un nuevo usuario.

**Ejemplo de Request Body:**

```json
{
  "idEvento": 4,
  "nombre": "Roman",
  "apellidos": "Espinoza",
  "correo": "roman@gmail.com",
  "dni": "59264967"
}
```
**Ejemplo de Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Insertado satisfactoriamente"
}
```

### GET /api/v1/usuarios

Esta ruta lista a todas los usuarios.

**Ejemplo de Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": [
    {
      "idUsuario": 1,
      "idEvento": 1,
      "nombre": "Roman",
      "apellidos": "Espinoza",
      "correo": "roman@gmail.com",
      "dni": "59264967",
      "estadoAuditoria": "1",
      "fechaCreacion": "2025-07-11T02:19:37.015Z",
      "fechaActualizacion": null
    },
    {
      "idUsuario": 2,
      "idEvento": 1,
      "nombre": "Pablo",
      "apellidos": "Pérez González",
      "correo": "juan.perez@example.com",
      "dni": "12345678",
      "estadoAuditoria": "1",
      "fechaCreacion": "2025-06-28T23:41:07.158Z",
      "fechaActualizacion": null
    }
  ]
 }
```

### GET /api/v1/usuarios/1

Esta ruta obtiene un usuario por ID.

**Parámetro de ruta:**

* `id`: ID del usuario a obtener.

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": {
    "idUsuario": 1,
    "idEvento": 1,
    "nombre": "Roman",
    "apellidos": "Espinoza",
    "correo": "roman@gmail.com",
    "dni": "59264967",
    "estadoAuditoria": "1",
    "fechaCreacion": "2025-07-11T02:19:37.015Z",
    "fechaActualizacion": null
  }
}
```

### PUT /api/v1/usuarios/1

Esta ruta actualiza un usuario por ID.

**Parámetro de ruta:**

* `id`: ID del usuario a actualizar.

**Ejemplo de Request Body:**

```json
{
  "idEvento": 1,
  "nombre": "Juan",
  "apellidos": "Espinoza",
  "correo": "roman@gmail.com",
  "dni": "59264964"
}
```

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Modificado satisfactoriamente"
}
```

### DELETE /api/v1/usuarios/1

Esta ruta elimina un usuario por ID.

**Parámetro de ruta:**

* `id`: ID del usuario a eliminar.
  
**Ejemplo de Respuesta Exitosa (200 OK):**
  
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Eliminado satisfactoriamente"
}
```

## Asistencias

### POST /api/v1/asistencias

Esta ruta permite crear una nueva asistencia.

**Ejemplo de Request Body:**

```json
  {
  "idUsuario": 1,
  "telefono": "123456789"
  }
```
**Ejemplo de Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Insertado satisfactoriamente"
}
```

### GET /api/v1/asistencias

Esta ruta lista todas las asistencias.

**Ejemplo de Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": [
   {
      "idAsistencia": 1,
      "idUsuario": 4,
      "telefono": "987654378",
      "asistio": "0",
      "estadoAuditoria": "1",
      "fechaRegistro": "2025-07-06T22:13:22.576Z",
      "fechaActualizacion": null
    },
    {
      "idAsistencia": 2,
      "idUsuario": 4,
      "telefono": "987654371",
      "asistio": "0",
      "estadoAuditoria": "1",
      "fechaRegistro": "2025-06-29T16:15:08.392Z",
      "fechaActualizacion": null
    }
  ]
 }
```

### GET /api/v1/asistencias/1

Esta ruta obtiene una asistencia por ID.

**Parámetro de ruta:**

* `id`: ID de la asistencia a obtener.

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": {
    "idAsistencia": 1,
    "idUsuario": 4,
    "telefono": "987654378",
    "asistio": "0",
    "estadoAuditoria": "1",
    "fechaRegistro": "2025-07-06T22:13:22.576Z",
    "fechaActualizacion": null
  }
}
```

### PUT /api/v1/asistencias/1

Esta ruta actualiza una asistencia por ID.

**Parámetro de ruta:**

* `id`: ID de la asistencia a actualizar.

**Ejemplo de Request Body:**

```json
  {
  "idUsuario": 2,
  "telefono": "123456523",
  "asistio":"1"
  }
```

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Modificado satisfactoriamente"
}
```

### DELETE /api/v1/asistencias/1

Esta ruta elimina una asistencia por ID.

**Parámetro de ruta:**

* `id`: ID de la asistencia a eliminar.
  
**Ejemplo de Respuesta Exitosa (200 OK):**
  
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Eliminado satisfactoriamente"
}
```

## Pagos

### POST /api/v1/pagos

Esta ruta permite crear un nuevo pago.

**Ejemplo de Request Body:**

```json
 {
  "idEvento": 1,
  "idUsuario": 1,
  "monto": 20.50,
  "metodoPago": "yape"
}
```
**Ejemplo de Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Insertado satisfactoriamente"
}
```

### GET /api/v1/pagos

Esta ruta lista todos los pagos.

**Ejemplo de Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": [
     {
      "idPago": 1,
      "idEvento": 1,
      "idUsuario": 1,
      "monto": "20.5",
      "fechaPago": "2025-07-11T02:39:40.986Z",
      "metodoPago": "yape",
      "estado": "pendiente",
      "estadoAuditoria": "1",
      "fechaActualizacion": null
    },
    {
      "idPago": 2,
      "idEvento": 1,
      "idUsuario": 1,
      "monto": "50.1",
      "fechaPago": "2025-06-29T04:14:44.747Z",
      "metodoPago": "transferencia",
      "estado": "pagado",
      "estadoAuditoria": "1",
      "fechaActualizacion": "2025-06-29T11:27:35.906Z"
    }
  ]
 }
```

### GET /api/v1/pagos/1

Esta ruta obtiene un pago por ID.

**Parámetro de ruta:**

* `id`: ID del pago a obtener.

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": {
    "idPago": 1,
    "idEvento": 1,
    "idUsuario": 1,
    "monto": "20.5",
    "fechaPago": "2025-07-11T02:39:40.986Z",
    "metodoPago": "yape",
    "estado": "pendiente",
    "estadoAuditoria": "1",
    "fechaActualizacion": null
  }
}
```

### PUT /api/v1/pagos/1

Esta ruta actualiza un pago por ID.

**Parámetro de ruta:**

* `id`: ID del pago a actualizar.

**Ejemplo de Request Body:**

```json
  {
  "idEvento": 1,
  "idUsuario": 2,
  "monto": 30.50,
  "metodoPago": "plin",
  "estado": "cancelado"
 }
```

**Ejemplo de Respuesta Exitosa (200 OK):**

```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Modificado satisfactoriamente"
}
```

### DELETE /api/v1/pagos/1

Esta ruta elimina un pago por ID.

**Parámetro de ruta:**

* `id`: ID del pago a eliminar.
  
**Ejemplo de Respuesta Exitosa (200 OK):**
  
```json
{
  "success": true,
  "message": "OK",
  "status": 200,
  "data": "Eliminado satisfactoriamente"
}
```

✅ Conclusión
Este proyecto base proporciona una estructura sólida para el desarrollo de APIs RESTful con Node.js y TypeScript, utilizando herramientas modernas como Prisma para la gestión de base de datos y Swagger para la documentación. Su enfoque modular y escalable permite una fácil extensión de funcionalidades, facilitando el trabajo colaborativo y el mantenimiento del código.

Además, la integración con Postman y Swagger asegura una experiencia de prueba y documentación eficiente tanto para desarrolladores como para testers.













    
 




