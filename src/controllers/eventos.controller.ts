import { Request, Response } from "express";
import { ResponseModel } from "../shared/resposeModel";
import { STATUS_INTERNAL_SERVER_ERROR } from "../shared/constants";
import * as eventosService from "../services/eventos.service";

export const listarEventos = async (req: Request, res: Response) => {
    console.log("Listando eventos...");
    try {
        const eventos = await eventosService.listarEventos();
        res.json(ResponseModel.success(eventos));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const obtenerEventos = async (req: Request, res: Response) => {
    console.log("Obteniendo evento por ID...");
    try {
        const { id } = req.params;
        const evento = await eventosService.obtenerEventos(Number(id));
        res.json(ResponseModel.success(evento));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const insertarEventos = async (req: Request, res: Response) => {
    console.log("Insertando nuevo evento...");
    try {
        const eventoCreado = await eventosService.insertarEventos(req.body);
        res.status(201).json(ResponseModel.success(eventoCreado));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}
export const modificarEventos = async (req: Request, res: Response) => {
    console.log("Modificando evento...");
    try {
        const { id } = req.params;
        const eventoModificado = await eventosService.modificarEventos(Number(id), req.body);
        res.json(ResponseModel.success(eventoModificado));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}

export const eliminarEventos = async (req: Request, res: Response) => {
    console.log("Eliminando evento...");
    try {
        const { id } = req.params;
        const eventoEliminado = await eventosService.eliminarEventos(Number(id));
        res.json(ResponseModel.success(eventoEliminado));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
}