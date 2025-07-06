"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const resposeModel_1 = require("../shared/resposeModel");
const jwt_1 = require("./jwt");
const constants_1 = require("../shared/constants");
const authMiddleware = (req, res, next) => {
    console.log('authMiddleware::authMiddleware');
    const header = req.headers.authorization;
    console.log(`authMiddleware::authMiddleware - Authorization Header: ${header}`);
    if (!header) {
        return res.status(constants_1.STATUS_UNAUTHORIZED).json(resposeModel_1.ResponseModel.error('Token no proporcionado'));
    }
    const token = header.split(' ')[1]; // "Bearer <token>"
    try {
        const decoded = (0, jwt_1.verifyToken)(token); // Esto debe retornar el payload
        req.user = decoded; // Inyectamos el usuario en el request
        next();
    }
    catch (error) {
        return res.status(constants_1.STATUS_UNAUTHORIZED).json(resposeModel_1.ResponseModel.error('Token inválido'));
    }
};
exports.authMiddleware = authMiddleware;
