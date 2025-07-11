import { RESPONSE_CREDENCIALES_ERROR, STATUS_BAD_REQUEST, STATUS_CREATED, STATUS_NOT_FOUND, STATUS_OK } from "../shared/constants";
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

export const listUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtener todos los usuarios, seleccionando solo id, username y role para evitar exponer la contraseña
        const users = await prisma.users.findMany({
            select: {
                id: true,
                username: true,
                password: true,
                role: true,
            },
        });
        res.status(STATUS_OK).json(ResponseModel.success(users, 'Usuarios listados exitosamente'));
    } catch (error: any) {
        res.status(STATUS_BAD_REQUEST).json(ResponseModel.error('Error al listar usuarios'));
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Suponiendo que el ID viene en los parámetros de la URL

    try {

      // Primero, verifica si el usuario existe antes de intentar obtenerlo
        const existingUser = await prisma.users.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingUser) {
            res.status(STATUS_NOT_FOUND).json(ResponseModel.error('Usuario no encontrado'));
            return;
        }

        const user = await prisma.users.findUnique({
            where: { id: parseInt(id) }, // Asegúrate de que el ID sea un número
            select: {
                id: true,
                username: true,
                password: true,
                role: true,
            },
        });

        if (!user) {
            res.status(STATUS_NOT_FOUND).json(ResponseModel.error('Usuario no encontrado'));
            return;
        }

        res.status(STATUS_OK).json(ResponseModel.success(user, 'Usuario obtenido exitosamente'));
    } catch (error: any) {
        res.status(STATUS_BAD_REQUEST).json(ResponseModel.error('Error al obtener usuario'));
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        // Primero, verifica si el usuario existe antes de intentar eliminarlo
        const existingUser = await prisma.users.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingUser) {
            res.status(STATUS_NOT_FOUND).json(ResponseModel.error('Usuario no encontrado'));
            return;
        }

        // Elimina el usuario de la base de datos
        await prisma.users.delete({
            where: { id: parseInt(id) },
        });

        // Envía una respuesta 200 OK con un mensaje de éxito
        res.status(STATUS_OK).json(ResponseModel.success(null, 'Usuario eliminado satisfactoriamente'));
    } catch (error: any) {
        // En caso de error, puedes devolver un 400 Bad Request
        res.status(STATUS_BAD_REQUEST).json(ResponseModel.error('Error al eliminar usuario'));
    }
};
