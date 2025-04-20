import {NextFunction, Request, Response} from 'express'
import db from "../config/db";

export const saveUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email} = req.body;
        await db.query("insert into users (name, email) values (?, ?)", [name, email]);
        res.status(200).json({
            message: `Successfully created ${name}!`,
        })
    } catch (e) {
        next(e);
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.status(200).json(rows)
    } catch (e) {
        next(e);
    }
}