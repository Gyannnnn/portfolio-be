import { Router } from "express";
import { addNewEducation, createEducationSection, getEducationSection, updateEducationSection } from "../../controller/education/education.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
const educationRouter = Router();

educationRouter.post("/create",authMiddleware,createEducationSection);
educationRouter.get("/get",getEducationSection);
educationRouter.put("/update",updateEducationSection);
educationRouter.post("/add-education",addNewEducation);

export default educationRouter