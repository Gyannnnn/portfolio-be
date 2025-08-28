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
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const updateIntro = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      userHeading,
      userBio,
      userResumeLink,
      userEmail,
      userGithubId,
    } = req.body;

    const updateData: any = {};

    if(userHeading !== undefined) updateData.userHeading = userHeading;
    if(userBio !== undefined) updateData.userBio = userBio;
    if(userResumeLink !== undefined) updateData.userResumeLink = userResumeLink;
    if(userEmail !== undefined) updateData.userEmail = userEmail;
    if(userGithubId !== undefined) updateData.userGithubId = userGithubId;

    if(Object.keys(updateData).length === 0){
      res.status(400).json({
        message: "No fields to update !"
      });
      return;
    }

    const updatedIntro = await prisma.portfolio.update({
      where:{
        userId
      },
      data:updateData
    })

    res.status(200).json({
      message: "Portfolio updated successfully",
      updatedIntro
    })

  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error:err.message
    })
  }
};
