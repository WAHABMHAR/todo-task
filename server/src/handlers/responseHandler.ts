import { Response } from "express";

export const responseMessage = (
    res: Response,
    success: boolean,
    status: number,
    message: string
) => {
    return res.status(status).json({
        success,
        status,
        message,
    });
};
export const responseData = (
    res: Response,
    success: boolean,
    status: number,
    message: string,
    options: any
) => {
    return res.status(status).json({
        success,
        status,
        message,
        data: { ...options },
    });
};
export const simpleResponseData = (
    res: Response,
    status: number,
    message: string,
    options: any
) => {
    return res.status(status).json({
        message,
        data: options,
    });
};
