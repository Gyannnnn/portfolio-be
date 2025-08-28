import { Router } from "express";
const introductionRouter = Router();

import { getIntro, updateIntro } from "../../controller/introduction/intro.controller";


introductionRouter.get("/get", getIntro);
introductionRouter.put("/update",updateIntro);

export default introductionRouter;
