import { Request, Response } from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAboutpage = async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      aboutHeading: z.string(),
      about: z.string(),
    });

    const results = schema.safeParse(req.body);
    if (results.error) {
      res.status(400).json({
        message: results.error,
      });
      return;
    }
    const { aboutHeading, about } = results.data;
    const response = await prisma.aboutSection.create({
      data: {
        aboutHeading,
        about,
      },
    });
    if(!response){
        res.status(400).json({
            message: "Something went wrong"
        });
        return
    }
    res.status(200).json({
        message: "ABout Section created successfully",
        response
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
        message: "Internal server error",
        error:err.message
    })
  }
};


export const getAboutPage = async(req:Request,res:Response)=>{
    try {
        const aboutPage = await prisma.aboutSection.findFirst()
        console.log(aboutPage);
        if(!aboutPage){
            res.status(400).json({
                message: "Something went wrong"
            });
            return
        }
        res.status(200).json({
            message: "About page fetched succesfully",
            aboutPage
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message:"Internal server error",
            error:err.message
        })
    }
}