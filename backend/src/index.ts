import dotenv from "dotenv";
dotenv.config();

import express, {Request, Response, NextFunction, } from 'express';
import movieRoutes from "./routes/movieRoutes";
import cors from 'cors';
import userRoutes from "./routes/userRoutes";
import likedMoviesRoutes from "./routes/likedMoviesRoutes";
import CustomError from "./types/CustomError";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/movies", movieRoutes)
app.use("/api/users", userRoutes)
app.use("/api/liked-movies", likedMoviesRoutes)

// global error handling
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const code = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(code).json({
        success: false,
        message: message,
    });
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
