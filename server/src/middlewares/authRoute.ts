import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user/user-model.js";
import { responseMessage } from "../handlers/responseHandler.js";

interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            responseMessage(res, false, 401, "Unauthorized Invalid Token");
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        const user = await User.findById({ _id: decoded.id });

        if (!user) {
            responseMessage(res, false, 401, "Unauthorized Invalid Token");
            return;
        }
        req.user = user;

        next();
    } catch (error) {
        responseMessage(res, false, 401, "Unauthorized Invalid Token");
    }
};
