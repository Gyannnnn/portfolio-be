import { Router } from "express";
const introductionRouter = Router();

import { getIntro, updateIntro } from "../../controller/introduction/intro.controller";
import { authMiddleware } from "../../middleware/auth.middleware";


introductionRouter.get("/get", getIntro);
introductionRouter.put("/update",authMiddleware,updateIntro);

export default introductionRouter;
