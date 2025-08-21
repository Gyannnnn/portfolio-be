import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';



export const authMiddleware = async(req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies?.token;

    if(!token){
        res.status(401).json({
            message: "Unauthorised access"
        });
        return;
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET!);
        req.user = decodedToken
        next();
    } catch (error) {
        const err = error as Error;
        res.status(500).json({
            messsage: "Internal server error",
            message: err.message
        });
    }

}