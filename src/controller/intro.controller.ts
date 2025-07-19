import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getIntro = async (req: Request, res: Response) => {
  try {
    const introduction = await prisma.portfolio.findFirst();
    if (!introduction) {
      res.status(404).json({
        message: "introduction not found",
      });
      return;
    }
    res.status(200).json({
      message: "Successfully fetched introduction  page",
      introduction,
    });
  } catch (error) {
    const err = error as Error
    res.status(500).json({
        message:"Internal server error",
        error:err.message
    })
  }
};
