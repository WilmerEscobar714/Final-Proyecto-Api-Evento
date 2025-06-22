import { Request, Response } from "express";
import { ResponseModel } from "../shared/resposeModel";
import { STATUS_INTERNAL_SERVER_ERROR } from "../shared/constants";
import * as eventosService from "../services/asistencias.service";

export const listarAsistencias = async (req: Request, res: Response) => {
    console.log("Listando asistencias...");
    try {
        const asistencias = await eventosService.listarAsistencias();
        res.json(ResponseModel.success(asistencias));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerAsistencias = async (req: Request, res: Response) => {
    console.log("Obteniendo asistencia por ID...");
    try {
        const { id } = req.params;
        const asistencia = await eventosService.obtenerAsistencias(Number(id));
        res.json(ResponseModel.success(asistencia));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertarAsistencias = async (req: Request, res: Response) => {
    console.log("Insertando nueva asistencia...");
    try {
        const asistenciaCreada = await eventosService.insertarAsistencias(req.body);
        res.status(201).json(ResponseModel.success(asistenciaCreada));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}   

export const modificarAsistencias = async (req: Request, res: Response) => {
    console.log("Modificando asistencia...");
    try {
        const { id } = req.params;
        const asistenciaModificada = await eventosService.modificarAsistencias(Number(id), req.body);
        res.json(ResponseModel.success(asistenciaModificada));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const eliminarAsistencias = async (req: Request, res: Response) => {
    console.log("Eliminando asistencia...");
    try {
        const { id } = req.params;
        const asistenciaEliminada = await eventosService.eliminarAsistencias(Number(id));
        res.json(ResponseModel.success(asistenciaEliminada));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}