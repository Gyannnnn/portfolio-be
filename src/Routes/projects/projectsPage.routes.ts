import { Router } from "express";
const projectPageRouter = Router();
import { createProjectPage, getProjectsPage } from "../../controller/projects/projectsPage.controller";

projectPageRouter.get("/",getProjectsPage)
projectPageRouter.post("/create",createProjectPage);


export default projectPageRouter;

