import { Router } from "express";
import {
  addNewExperience,
  createExperienceSection,
  getExperienceSection,
  updateExperienceSection,
} from "../../controller/experience/experience.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
const experienceRouter = Router();

experienceRouter.post("/create", authMiddleware, createExperienceSection);
experienceRouter.get("/get", getExperienceSection);
experienceRouter.post("/add-exp", authMiddleware, addNewExperience);
experienceRouter.put("/update", authMiddleware, updateExperienceSection);

export default experienceRouter;
