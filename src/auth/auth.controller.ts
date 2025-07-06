import { RESPONSE_CREDENCIALES_ERROR, STATUS_UNAUTHORIZED } from "../shared/constants";
import { ResponseModel } from "../shared/resposeModel";
import { Request,Response } from "express";
import * as loginService from "./auth.service"

export const loginAuth  = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const token = await loginService.loginAuth(username, password);

        if (token === RESPONSE_CREDENCIALES_ERROR) {
            res.status(STATUS_UNAUTHORIZED).json(ResponseModel.error(token));
        } else {
            res.json(ResponseModel.success({ token }));
        }
    } catch (error: any) {
        res.status(STATUS_UNAUTHORIZED).json(ResponseModel.error(error.message));
    }
};
