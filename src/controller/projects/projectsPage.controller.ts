import { Request, Response } from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
import id from "zod/v4/locales/id.cjs";
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
    const projectsPage = await prisma.projectSection.findFirst({
      where: {
        portfolioId: "ba63f704-9383-406a-8bc6-2868431a9c42",
      },
      select: {
        projects: true,
        portfolioId: true,
        projectHeading: true,
        id: true,
      },
    });
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

export const createProject = async (req: Request, res: Response) => {
  try {
    const projectSchema = z.object({
      projectName: z.string(),
      projectHeading: z.string(),
      projectDescription: z.string(),
      techStack: z.array(z.string()),
      features: z.array(z.string()),
      challenges: z.array(z.string()),
      learnings: z.array(z.string()),
      githubLink: z.string().url(),
      deployedLink: z.string().url().optional(),
      projectSectionId: z.string(),
    });
    const results = projectSchema.safeParse(req.body);
    if (results.error) {
      res.status(400).json({
        message: results.error,
      });
      return;
    }
    const {
      projectName,
      projectHeading,
      projectDescription,
      techStack,
      features,
      challenges,
      learnings,
      githubLink,
      deployedLink,
      projectSectionId,
    } = results.data;
    const response = await prisma.project.create({
      data: {
        projectName,
        projectHeading,
        projectDescription,
        techStack,
        features,
        challenges,
        learnings,
        githubLink,
        deployedLink,

        projectSection: {
          connect: { id: projectSectionId },
        },
      },
    });
    if (!response) {
      res.status(200).json({
        message: `${projectName} Failed to crearte `,
      });
      return;
    }
    res.status(200).json({
      message: "Projects created successfully",
      response,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getProjectByName = async (req: Request, res: Response) => {
  try {
    const { projectName } = req.params;
    if (!projectName?.trim()) {
      res.status(401).json({
        message: "All fields are required !",
      });
      return;
    }
    const results = await prisma.project.findFirst({
      where: {
        projectName,
      },
    });
    if (!results) {
      res.status(404).json({
        message: "Np project found !",
      });
      return;
    }
    res.status(200).json({
      message: "Project fetched successfully",
      results,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
