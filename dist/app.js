"use strict";
//configurar conexion a BD , ruutas cosas de los servidores, etc
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = __importDefault(require("./config/env"));
const categorias_routes_1 = __importDefault(require("./routes/categorias.routes"));
const eventos_routes_1 = __importDefault(require("./routes/eventos.routes"));
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const asistencias_routes_1 = __importDefault(require("./routes/asistencias.routes"));
const pagos_routes_1 = __importDefault(require("./routes/pagos.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
//Base de datos
//midler
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Rutas
app.use(`${env_1.default.API_PREFIX}/categorias`, categorias_routes_1.default);
app.use(`${env_1.default.API_PREFIX}/asistencias`, asistencias_routes_1.default);
app.use(`${env_1.default.API_PREFIX}/eventos`, eventos_routes_1.default);
app.use(`${env_1.default.API_PREFIX}/usuarios`, usuarios_routes_1.default);
app.use(`${env_1.default.API_PREFIX}/pagos`, pagos_routes_1.default);
app.use(`${env_1.default.API_PREFIX}/auth`, auth_routes_1.default);
//Exportar por defecto 
exports.default = app;
