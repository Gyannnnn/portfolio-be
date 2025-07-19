import { Request, Response } from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPortfolio = async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      userName: z.string(),
      userHeading: z.string(),
      userBio: z.string(),
      userResumeLink: z.string(),
      userEmail: z.string(),
      userGithubId: z.string(),
      userId: z.string(),
    });

    const results = schema.safeParse(req.body);
    if (results.error) {
      res.status(400).json({
        message: results.error,
      });
      return;
    }
    const {
      userName,
      userHeading,
      userBio,
      userResumeLink,
      userEmail,
      userGithubId,
      userId,
    } = results.data;
    const response = await prisma.portfolio.create({
      data: {
        userName,
        userHeading,
        userBio,
        userResumeLink,
        userEmail,
        userGithubId,        
        userId,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "Failed to create portfolio",
      });
      return;
    }
    res.status(200).json({
      message: "Portfolio created successfully",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
