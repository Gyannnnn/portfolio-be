import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const portfolioId = process.env.PF_ID;

export const createEducationSection = async (req: Request, res: Response) => {
  const { educationHeading, educationDescription } = req.body;
  if (!educationHeading.trim() || !educationHeading.trim()) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  try {
    const eduSection = await prisma.educationSection.create({
      data: {
        educationHeading,
        educationDescription,
        portfolioId,
      },
    });
    if (!eduSection) {
      res.status(400).json({
        message: "Failed to create education section",
      });
      return;
    }
    res.status(201).json({
      message: "Education section created successfully",
      eduSection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getEducationSection = async (req: Request, res: Response) => {
  try {
    const educationSection = await prisma.educationSection.findFirst({
      where: {
        portfolioId,
      },
      select: {
        id: true,
        educationHeading: true,
        educationDescription: true,
        portfolioId: true,
        education: true,
      },
    });

    if (!educationSection) {
      res.status(400).json({
        message: "Failed to fetch education section",
      });
      return;
    }
    res.status(200).json({
      message: "Education section fetched",
      educationSection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const updateEducationSection = async (req: Request, res: Response) => {
  try {
    const { educationHeading, educationDescription, portfolioId } = req.body;
    if (!portfolioId.trim()) {
      res.status(400).json({
        message: "Portfolio id required",
      });
      return;
    }

    const updateData: any = {};

    if (educationHeading !== undefined || educationHeading !== "")
      updateData.educationHeading = educationHeading;
    if (educationDescription !== undefined && educationDescription !== "")
      updateData.educationDescription = educationDescription;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        message: "No fields to update !",
      });
      return;
    }

    const updatedEducationSection = await prisma.educationSection.update({
      where: {
        portfolioId,
      },
      data: updateData,
    });

    if(!updatedEducationSection){
        res.status(400).json({
            message: "Failed to update education section"
        })
    }

    res.status(200).json({
      message: "Education section updated successfully",
      updatedEducationSection,
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

export const addNewEducation = async (req: Request, res: Response) => {
  const {
    educationName,
    joiningDate,
    educationDescription,
    educationSectionId,
  } = req.body;
  if (
    !educationName.trim() ||
    !joiningDate.trim() ||
    !educationDescription.trim() ||
    !educationSectionId.trim()
  ) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  try {
    const response = await prisma.education.create({
      data: {
        educationName,
        joiningDate,
        educationDescription,
        educationSectionId,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "Failed to Add new education",
      });
      return;
    }
    res.status(200).json({
      message: "New education added successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
