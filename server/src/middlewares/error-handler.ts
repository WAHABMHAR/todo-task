import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = "Something went wrong";

    // MongoDB Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        message = `The ${field} '${value}' is already registered. Please use a different ${field}.`;
        statusCode = 409; // Conflict
    }

    // Mongoose Validation Error
    else if (err.name === "ValidationError") {
        message = Object.values(err.errors)
            .map((val: any) => val.message)
            .join(", ");
        statusCode = 400;
    }

    // Cast Error (e.g., invalid ObjectId)
    else if (err.name === "CastError") {
        message = `Invalid ${err.path}: ${err.value}`;
        statusCode = 400;
    }

    // Custom Error
    else if (err.message) {
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorCode: err.code || undefined,
    });
};
