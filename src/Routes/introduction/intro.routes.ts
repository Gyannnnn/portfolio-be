import { Router } from "express";

const introductionRouter = Router();

import { getIntro } from "../../controller/intro.controller";
introductionRouter.get("/get", getIntro);

export default introductionRouter;
