import { NextFunction, Request, Response } from "express";
import { responseMessage, responseData } from "../../handlers/responseHandler.js";
import User from "../../models/user/user-model.js";
import { CreateToken, verifyToken } from "../../handlers/tokenHandlers.js";
import { verficationEmail } from "../../utils/emails/mails.js";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return responseMessage(res, false, 400, "All fields are required");
        }

        const token = CreateToken({ email });

        await User.create({
            name,
            email,
            password,
            verficationToken: token,
        });

        await verficationEmail(email, name, token);
        return responseMessage(res, true, 201, "Check your email to verify your account");
    } catch (error: any) {
        next(error);
    }
};
export const verifyUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { token } = req.params;

        const user = await User.findOne({ verficationToken: token });

        const redirectSuccessLink = `${process.env.FRONTEND_URL}/verify-success`;
        const redirectFailedLink = `${process.env.FRONTEND_URL}/verify-failed`;

        if (!user) {
            return res.redirect(redirectFailedLink);
        }

        user.isVerified = true;
        user.verficationToken = null;
        await user.save();

        return res.redirect(redirectSuccessLink);
    } catch (error: any) {
        res.redirect(`${process.env.FRONTEND_URL}/verify-failed`);
    }
};
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).lean();

        if (user && !user.isVerified) {
            return res.status(401).json({ message: "Verify your email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = CreateToken({ email, id: user._id });
        let response = { ...user, token };

        return responseData(res, true, 200, "Login successfully", response);
    } catch (error: any) {
        next(error);
    }
};
export const getAuthUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const token = req.header("x-auth-token");

        const decodedToken: any = verifyToken(token);
        if (!decodedToken) {
            return responseMessage(res, false, 401, "Invalid Token");
        }
        const { email } = decodedToken;

        const user = await User.findOne({ email }).lean();

        let response = { ...user, token };

        return responseData(res, true, 200, "User Fetch Sucessfully", response);
    } catch (error: any) {
        next(error);
    }
};

export const subscribeNewsletter = async (req: any, res: Response): Promise<any> => {
    const { email, userId } = req.body;

    await User.findByIdAndUpdate(userId, {
        isFirstLogin: false,
    });

    // (Optional: send email via Nodemailer here)
    return res.status(200).json({ success: true, message: "Subscribed successfully" });
};
