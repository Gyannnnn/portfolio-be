import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Unauthorized access",
    });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload;
    if(decoded.role === "Admin"){
      next();
    }
    return res.status(403).json({
      message: "Forbidden: Visitors are not allowd",
    });
  } catch (error) {
    const err = error as Error;
    res.status(403).json({
      message: "Invalid or expired token",
      error:err.message
    })
  }
};
