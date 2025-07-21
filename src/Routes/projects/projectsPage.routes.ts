import { Router } from "express";
const projectPageRouter = Router();
import { createProject, createProjectPage, getProjectByName, getProjectsPage } from "../../controller/projects/projectsPage.controller";

projectPageRouter.get("/",getProjectsPage)
projectPageRouter.post("/create",createProjectPage);
projectPageRouter.post("/project/create",createProject)


projectPageRouter.get("/project/:projectName",getProjectByName)


export default projectPageRouter;

