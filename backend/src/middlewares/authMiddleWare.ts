import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import CustomError from "../types/CustomError";

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ") || !authHeader) {
            res.status(401).json({message: "No token provided"});
            return;
        }

        const token = authHeader?.split(" ")[1];
        jwt.verify(token!, process.env.PUBLIC_JWT_SECRET!); // verifying the token sent by the client
        next();

    } catch (e) {
        next(new CustomError(401, "Insufficient Permissions!"))
        // next(e);
    }
}