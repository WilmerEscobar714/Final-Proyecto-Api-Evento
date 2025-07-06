import { RESPONSE_CREDENCIALES_ERROR, STATUS_BAD_REQUEST, STATUS_CREATED } from "../shared/constants";
import { signToken } from "./jwt";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { ResponseModel } from "../shared/resposeModel";
import { Request,Response } from "express";

const prisma = new PrismaClient();

export const loginAuth = async (username: string, password: string) => {
  // Buscar el usuario en la base de datos
  const user = await prisma.users.findUnique({
    where: { username },
  });

  // Validar existencia del usuario y comparar contraseña
  if (!user) return RESPONSE_CREDENCIALES_ERROR;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return RESPONSE_CREDENCIALES_ERROR;

  // Generar token con los datos del usuario
  const token = signToken({
    id: user.id,
    username: user.username,
    role: user.role,
  });

  return token;
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.users.findUnique({ where: { username } });
    if (existingUser) {
      res.status(STATUS_BAD_REQUEST).json(ResponseModel.error('El usuario ya existe'));
      return;
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario en la base de datos
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        role: role || 'ADMINISTRADOR',
      },
    });

    res.status(STATUS_CREATED).json(ResponseModel.success({ id: newUser.id, username: newUser.username, role: newUser.role }, 'Usuario registrado exitosamente'));
  } catch (error: any) {
    res.status(STATUS_BAD_REQUEST).json(ResponseModel.error('Error al registrar usuario'));
  }
};
