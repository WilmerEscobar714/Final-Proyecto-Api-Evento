
//configurar conexion a BD , ruutas cosas de los servidores, etc

import express, { Application } from 'express';
import cors from 'cors';
import env from './config/env';
import CategoriaRoutes from './routes/categorias.routes';
import EventoRoutes from './routes/eventos.routes';
import UsuarioRoutes from './routes/usuarios.routes';
import AsistenciaRoutes from './routes/asistencias.routes';
import PagosRouters from './routes/pagos.routes';
import authRouter from './routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

const app: Application = express();

//Base de datos
//midler
app.use(express.json());
app.use(cors());

app.use(`${env.API_PREFIX}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Rutas
app.use(`${env.API_PREFIX}/categorias`, CategoriaRoutes);
app.use(`${env.API_PREFIX}/asistencias`, AsistenciaRoutes);
app.use(`${env.API_PREFIX}/eventos`, EventoRoutes);
app.use(`${env.API_PREFIX}/usuarios`, UsuarioRoutes);
app.use(`${env.API_PREFIX}/pagos`, PagosRouters);
app.use(`${env.API_PREFIX}/auth`, authRouter);


//Exportar por defecto 
export default app;
