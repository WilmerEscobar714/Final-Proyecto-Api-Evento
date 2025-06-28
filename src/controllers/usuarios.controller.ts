import { Request, Response } from "express";
import { ResponseModel } from "../shared/resposeModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR } from "../shared/constants";
import * as usuariosService from "../services/usuarios.service";
import { usuariosCrearSchema } from "../schemas/usuariosSchema";


export const listarUsuarios = async (req: Request, res: Response) => {
    console.log("Listando usuarios...");
    try {
        const usuarios = await usuariosService.listarUsuarios();
        res.json(ResponseModel.success(usuarios));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerUsuarios = async (req: Request, res: Response) => {
    console.log("Obteniendo usuario por ID...");
    try {
        const { id } = req.params;
        const usuario = await usuariosService.obtenerUsuarios(Number(id));
        res.json(ResponseModel.success(usuario));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertarUsuarios = async (req: Request, res: Response) : Promise<any>  =>{
    console.log("Insertando nuevo usuario...");

    const {error}:any = usuariosCrearSchema.validate(req.body);
    if (error) {
         return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }

    try {
        const usuarioCreado = await usuariosService.insertarUsuarios(req.body);
        res.status(201).json(ResponseModel.success(usuarioCreado));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const modificarUsuarios = async (req: Request, res: Response) => {
    console.log("Modificando usuario...");
    try {
        const { id } = req.params;
        const usuarioModificado = await usuariosService.modificarUsuarios(Number(id), req.body);
        res.json(ResponseModel.success(usuarioModificado));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const eliminarUsuarios = async (req: Request, res: Response) => {
    console.log("Eliminando usuario...");
    try {
        const { id } = req.params;
        const usuarioEliminado = await usuariosService.eliminarUsuarios(Number(id));
        res.json(ResponseModel.success(usuarioEliminado));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}