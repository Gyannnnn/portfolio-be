import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const portfolioId = process.env.PF_ID;

export const createExperienceSection = async (req: Request, res: Response) => {
  const { experienceHeading, experienceDescription } = req.body;
  if (!experienceHeading.trim() || !experienceDescription.trim()) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  try {
    const expSection = await prisma.experienceSection.create({
      data: {
        experienceDescription,
        experienceHeading,
        portfolioId,
      },
    });
    if (!expSection) {
      res.status(400).json({
        message: "Failed to create experience section",
      });
      return;
    }
    res.status(201).json({
      message: "Experience section created successfully",
      expSection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getExperienceSection = async (req: Request, res: Response) => {
  try {
    const experienceSection = await prisma.experienceSection.findFirst({
      where: {
        portfolioId,
      },
      select: {
        id: true,
        experienceHeading: true,
        experienceDescription: true,
        portfolioId: true,
        experience: true,
      },
    });

    if (!experienceSection) {
      res.status(400).json({
        message: "Failed to fetch experience section",
      });
      return;
    }
    res.status(200).json({
      message: "Experience section fetched",
      experienceSection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const updateExperienceSection = async (req: Request, res: Response) => {
  try {
    const { experienceHeading, experienceDescription, portfolioId } = req.body;
    if (!portfolioId.trim()) {
      res.status(400).json({
        message: "Portfolio id required",
      });
      return;
    }

    const updateData: any = {};

    if (experienceHeading !== undefined && experienceHeading !== "")
      updateData.experienceHeading = experienceHeading;
    if (experienceDescription !== undefined && experienceDescription !== "")
      updateData.experienceDescription = experienceDescription;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        message: "No fields to update !",
      });
      return;
    }

    const updatedExperienceSection = await prisma.experienceSection.update({
      where: {
        portfolioId,
      },
      data: updateData,
    });

    res.status(200).json({
      message: "Experience section updated successfully",
      updatedExperienceSection,
    });
  } catch (error) {
    console.log(error);
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const addNewExperience = async (req: Request, res: Response) => {
  const {
    experienceName,
    joiningDate,
    experienceDescription,
    experienceSectionId,
  } = req.body;
  if (
    !experienceName.trim() ||
    !joiningDate.trim() ||
    !experienceDescription.trim() ||
    !experienceSectionId.trim()
  ) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  try {
    const response = await prisma.experience.create({
      data: {
        experienceName,
        joiningDate,
        experienceDescription,
        experienceSectionId,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "Failed to Add new experience",
      });
      return;
    }
    res.status(200).json({
      message: "New experience added successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
