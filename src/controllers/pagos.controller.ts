import { Request, Response } from "express";
import { ResponseModel } from "../shared/resposeModel";
import { STATUS_INTERNAL_SERVER_ERROR } from "../shared/constants";
import * as pagosService from "../services/pagos.service";

export const listarPagos = async (req: Request, res: Response) => {
    console.log("Listando pagos...");
   try {
           const pagos = await pagosService.listarPagos();
           res.json(ResponseModel.success(pagos));
       } catch (error: any) {
           console.error(error.message);
           res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
       }
};

export const obtenerPagos = async (req: Request, res: Response) => {
    console.log("Obteniendo pago por ID...");
    try {
        const { id } = req.params;
        const pago = await pagosService.obtenerPagos(Number(id));
        res.json(ResponseModel.success(pago));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};

export const insertarPagos = async (req: Request, res: Response) => {
    console.log("Insertando nuevo pago...");
    try {
        const pagoCreado = await pagosService.insertarPagos(req.body);
        res.status(201).json(ResponseModel.success(pagoCreado));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};

export const modificarPagos = async (req: Request, res: Response) => {
    console.log("Modificando pago...");
    try {
        const { id } = req.params;
        const pagoModificado = await pagosService.modificarPagos(Number(id), req.body);
        res.json(ResponseModel.success(pagoModificado));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};

export const eliminarPagos = async (req: Request, res: Response) => {
    console.log("Eliminando pago...");
    try {
        const { id } = req.params;
        const pagoEliminado = await pagosService.eliminarPagos(Number(id));
        res.json(ResponseModel.success(pagoEliminado));
    } catch (error: any) {
        console.error(error.message);
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(ResponseModel.error(error.message));
    }
};


