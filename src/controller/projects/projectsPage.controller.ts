import { Request, Response } from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//ba63f704-9383-406a-8bc6-2868431a9c42

export const createProjectPage = async (req: Request, res: Response) => {
  try {
    const projectPageSchema = z.object({
      projectHeading: z.string(),
      portfolioId: z.string(),
    });
    const results = projectPageSchema.safeParse(req.body);
    if (results.error) {
      res.status(400).json({
        message: results.error,
      });
      return;
    }
    const { projectHeading, portfolioId } = results.data;
    const response = await prisma.projectSection.create({
      data: {
        projectHeading,
        portfolioId,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "Something went wrong",
      });
      return;
    }
    res.status(200).json({
      message: "Successfully created Projects page",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getProjectsPage = async (req: Request, res: Response) => {
  try {
    const projectsPage = await prisma.projectSection.findFirst();
    if (!projectsPage) {
      res.status(404).json({
        message: "No Projects page found !",
      });
      return;
    }
    res.status(200).json({
      message: "Successfully fetched projects page",
      projectsPage: projectsPage,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
