import {NextFunction, Request, Response} from 'express'
import db from "../config/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from "../types/types";
import CustomError from "../types/CustomError";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            next(new CustomError(400, "Name, email and password are required!"));
            return;
        }
        await db.query("insert into users (name, email, password) values (?, ?, ?)", [name, email, bcrypt.hashSync(password, 10)]);
        res.status(200).json({
            message: `Successfully created ${name}!`,
        })
    } catch (e) {
        next(e);
    }
}

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            next(new CustomError(400, 'Email and password are required!'))
            return;
        }

        const [rows] = await db.query<User[]>("select * from users where email=?", [email]);
        const user = rows[0];
        if (!user || !bcrypt.compareSync(password, user.password)) {
            next(new CustomError(401, "Invalid Credentials!"))
            return;
        }

        const token = jwt.sign({id: user.id}, process.env.PUBLIC_JWT_SECRET!, {
            // expiresIn: '1d'
        });

        res.status(200).json({token});
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