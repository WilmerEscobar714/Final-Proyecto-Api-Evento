"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config();
const env = joi_1.default.object({
    DATABASE_URL: joi_1.default.string().uri().required(),
    PORT: joi_1.default.number().default(3000),
    API_PREFIX: joi_1.default.string().default('/api/v1'),
}).unknown();
const { error, value } = env.validate(process.env);
if (error) {
    throw new Error(`Error en las variables de entorno: ${error.message}`);
}
exports.default = value;
