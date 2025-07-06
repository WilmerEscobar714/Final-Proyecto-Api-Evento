import { Request,Response,NextFunction } from "express";
import { ResponseModel } from "../shared/resposeModel";
import { verifyToken } from "./jwt";
import { STATUS_UNAUTHORIZED } from "../shared/constants";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  console.log('authMiddleware::authMiddleware');

  const header: string | undefined = req.headers.authorization;
  console.log(`authMiddleware::authMiddleware - Authorization Header: ${header}`);

  if (!header) {
    return res.status(STATUS_UNAUTHORIZED).json(ResponseModel.error('Token no proporcionado'));
  }

  const token = header.split(' ')[1]; // "Bearer <token>"
  try {
    const decoded = verifyToken(token); // Esto debe retornar el payload
    (req as any).user = decoded; // Inyectamos el usuario en el request
    next();
  } catch (error: any) {
    return res.status(STATUS_UNAUTHORIZED).json(ResponseModel.error('Token inválido'));
  }
};
