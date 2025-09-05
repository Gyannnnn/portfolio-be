import { Router } from "express";
const projectPageRouter = Router();
import {
  createProject,
  createProjectPage,
  getProjectByName,
  getProjectsPage,
  updateProject,
} from "../../controller/projects/projectsPage.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

projectPageRouter.get("/", getProjectsPage);
projectPageRouter.post("/create", authMiddleware, createProjectPage);
projectPageRouter.post("/project/create", authMiddleware, createProject);

projectPageRouter.get("/project/:projectName", getProjectByName);
projectPageRouter.get("/project/update", authMiddleware, updateProject);

export default projectPageRouter;
