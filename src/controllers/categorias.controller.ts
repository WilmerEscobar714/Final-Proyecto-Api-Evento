import { Request, Response } from "express";
import { ResponseModel } from "../shared/resposeModel";
import { STATUS_BAD_REQUEST, STATUS_INTERNAL_SERVER_ERROR } from "../shared/constants";
import * as categoriasService from "../services/categorias.service";
import { categoriasCrearSchema } from "../schemas/categoriasSchema";

export const listarCategorias = async (req: Request, res: Response) => {
    console.log("Listando categorias...");
    try {
        const categorias = await categoriasService.listarCategorias();
        res.json(ResponseModel.success(categorias));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerCategorias = async (req: Request, res: Response) => {
    console.log("Obteniendo categoria por ID...");
    try {
        const { id } = req.params;
        const categoria = await categoriasService.obtenerCategorias(Number(id));
        res.json(ResponseModel.success(categoria));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertarCategorias = async (req: Request, res: Response): Promise<any>  => {
    console.log("Insertando nueva categoria...");
    const {error}: any= categoriasCrearSchema.validate(req.body);
    if (error) {
        return res.status(STATUS_BAD_REQUEST).json(ResponseModel.error(error.message, STATUS_BAD_REQUEST));
    }
    try {
        const categoriaCreada = await categoriasService.insertarCategorias(req.body);
        res.status(201).json(ResponseModel.success(categoriaCreada));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const modificarCategorias = async (req: Request, res: Response) => {
    console.log("Modificando categoria...");
    try {
        const { id } = req.params;
        const categoriaModificada = await categoriasService.modificarCategorias(Number(id), req.body);
        res.json(ResponseModel.success(categoriaModificada));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const eliminarCategorias = async (req: Request, res: Response) => {
    console.log("Eliminando categoria...");
    try {
        const { id } = req.params;
        const categoriaEliminada = await categoriasService.eliminarCategorias(Number(id));
        res.json(ResponseModel.success(categoriaEliminada));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}