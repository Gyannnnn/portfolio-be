import { Request, Response } from "express";
import z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { strict } from "assert";

export const signUp = async (request: Request, response: Response) => {
  try {
    const schema = z.object({
      userName: z.string().min(4),
      userEmail: z.string().email(),
      userPassword: z
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }),
    });
    const results = schema.safeParse(request.body);
    if (!results.success) {
      response.status(400).json({
        message: results.error,
      });
      return;
    }
    const { userEmail, userPassword, userName } = results.data;
    const hashedUserPassword = bcrypt.hashSync(userPassword, 10);
    const existingUser = await prisma.user.findUnique({ where: { userEmail } });
    if (existingUser) {
      response.status(409).json({
        message: "User already exists",
      });
      return;
    }

    const newUser = await prisma.user.create({
      data: {
        userEmail,
        userName,
        userPassword: hashedUserPassword,
      },
    });
    if (!newUser) {
      response.status(500).json({
        message: "Failed to create user",
      });
    }
    const token = jwt.sign({ userEmail, userName }, process.env.JWT_SECRET!, {
      expiresIn: "30days",
    });

    response.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    response.status(200).json({
      message: "User Created successfully",
      newUser: newUser,
      token: token,
    });
  } catch (error) {
    const err = error as Error;
    response.status(500).json({
      messsage: "Internal Server Error",
      error: err.message,
    });
  }
};

export const signIn = async (request: Request, response: Response) => {
  
  try {
    // Define and validate schema
    const schema = z.object({
      userEmail: z.string().email(),
      userPassword: z
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
          message:
            "Password must include uppercase, lowercase, number, and special character",
        }),
    });
    

    const result = schema.safeParse(request.body);
    if (!result.success) {
      response.status(400).json({
        message: "Validation failed",
        errors: result.error,
      });
      return;
    }

    const { userEmail, userPassword } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { userEmail },
    });

    if (!existingUser) {
      response.status(404).json({
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      existingUser.userPassword
    );

    if (!isPasswordValid) {
      response.status(401).json({
        message: "Invalid password",
      });
      return;
    }

    const token = jwt.sign(
      { userId: existingUser.id, userEmail: existingUser.userEmail,role:existingUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    );

    // response.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "none",
    // });

    // response.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false, // HTTP in localhost
    //   sameSite: "lax", // use "lax" for localhost
    //   path: "/",
    // });
    

    return response.status(200).json({
      message: "Sign in successful",
      token,
      user: {
        id: existingUser.id,
        userEmail: existingUser.userEmail,
        userName: existingUser.userName,
        userRole:existingUser.role
      },
    });
  } catch (error) {
    const err = error as Error;
    return response.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const me = (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).json({
    message: "User fetched !",
    user,
  });
};
