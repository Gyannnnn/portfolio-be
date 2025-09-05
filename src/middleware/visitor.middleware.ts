import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const portfolioId = process.env.PF_ID!;

export const visitorCountMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    await prisma.portfolio.update({
      where: { id: portfolioId },
      data: {
        views: {
          increment: 1, 
        },
      },
    });
  } catch (error) {
    console.error("Failed to increment visitor count:", error);
  }  
  next();
};
