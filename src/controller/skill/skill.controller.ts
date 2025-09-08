import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const portfolioId = process.env.PF_ID;

export const getSkillSection = async (req: Request, res: Response) => {
  try {
    const skillSection = await prisma.skillSection.findFirst({
      select: {
        id: true,
        skillHeading: true,
        skillDescription: true,
        skills: true,
        portfolioId: true,
      },
    });
    if (!skillSection) {
      res.status(400).json({
        message: "No skill section found",
      });
      return;
    }
    res.status(200).json({
      message: "Fetched skill section",
      skillSection,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const createSkillSection = async (req: Request, res: Response) => {
  const { skillHeading, skillDescription } = req.body;

  if (!skillDescription.trim() || !skillHeading.trim()) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  console.log(portfolioId);
  try {
    const response = await prisma.skillSection.create({
      data: {
        portfolioId,
        skillHeading,
        skillDescription,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "Failed to create skill section",
      });
      return;
    }
    res.status(200).json({
      message: "Skill section created successfuly",
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const updateSkillSection = async (req: Request, res: Response) => {
  const { skillHeading, skillDescription, portfolioId } = req.body;
  try {
    const updateDate: any = {};
    if (skillHeading !== undefined && skillHeading !== "") updateDate.skillHeading = skillHeading;
    if (skillDescription !== undefined && skillDescription !== "")
      updateDate.skillDescription = skillDescription;
    if (Object.keys(updateDate).length === 0) {
      res.status(400).json({
        message: "Nothing to update",
      });
      return;
    }
    const response = await prisma.skillSection.update({
      where: {
        portfolioId,
      },
      data: updateDate,
    });
    if (!response) {
      res.status(400).json({
        message: "Failed to update skill section",
      });
      return;
    }
    res.status(200).json({
      message: "Skill section updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const addNewSkill = async (req: Request, res: Response) => {
  const { skillIcon, skillName, skillIconColor, skillSectionId } = req.body;
  if (
    !skillIcon.trim() ||
    !skillName.trim() ||
    !skillIconColor.trim() ||
    !skillSectionId.trim()
  ) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  try {
    const response = await prisma.skill.create({
      data: {
        skillIcon,
        skillName,
        skillIconColor,
        skillSectionId,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "Failed to Add new skill",
      });
      return;
    }
    res.status(200).json({
      message: "New skill added successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  const { skillName } = req.body();
  if (!skillName.trim()) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  try {
    const response = await prisma.skill.delete({
      where: {
        skillName,
      },
    });
    if (!response) {
      res.status(400).json({
        message: "Failed to update",
      });
      return;
    }
    res.status(200).json({
      message: `Successfully deleted ${skillName} skill`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
