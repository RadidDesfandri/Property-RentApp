import { Response } from "express";

type errorType = string | Error

export const responseError = (res: Response, error: any) => {
    return res.status(400).json({
        status: "error",
        msg: error
    })
}