import { Request, Response } from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const protfolioId = process.env.PF_ID!;

export const getStats = async (req: Request, res: Response) => {
  try {
    const data = await prisma.portfolio.findFirst({
      where: {
        id: protfolioId,
      },
      select: {
        views: true,
        likes: true,
      },
    });
    if (!data) {
      res.status(400).json({
        message: "Failed to fetch analytics",
      });
    }
    res.status(200).json({
      message: "Analytics fetched",
      data,
    });
  } catch (error) {
    res.status(500).json({
      messaeg: "Internal server error",
      error,
    });
  }
};

export const updateLike = async (req: Request, res: Response) => {
  try {
    const response = await prisma.portfolio.update({
      where: {
        id: protfolioId,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
    res.status(200).json({
      message: "Portfolio liked successfully",
      likes: response.likes,
    });
  } catch (error) {
    res.status(500).json({
        message: "Internal server error",
        error
    });

  }
};
