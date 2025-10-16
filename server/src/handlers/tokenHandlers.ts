import jwt from "jsonwebtoken";
import { responseMessage } from "./responseHandler.js";
import { Types } from "mongoose";

interface JwtPayload {
    id?: Types.ObjectId;
    email?: string;
    role?: string;
}

export const CreateToken = (payload: JwtPayload): string | null => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
        return token;
    } catch (err: any) {
        responseMessage(null, false, 500, err.message);
        return null;
    }
};
export const verifyToken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return decoded;
    } catch (err) {
        console.log("Token verification failed:", err);
        return false;
    }
};
