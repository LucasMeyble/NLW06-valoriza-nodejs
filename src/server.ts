import "reflect-metadata"
import "./database"
import "express-async-errors"; //tem q ser importado aqui, nao sei pq
import { router } from "./routes";
import express, { Response, Request, NextFunction } from 'express';

const app = express();

app.use(express.json())

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error){
        return response.status(400).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "error",
        message: "internal Server Error"
    })
})

app.listen(3000, () => console.log('server running 💙')) 