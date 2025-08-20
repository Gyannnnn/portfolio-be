import { Router } from "express";
import { createAboutpage, getAboutPage } from "../../controller/about/aboutpage.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
const aboutPageRouter = Router();


aboutPageRouter.post("/create",authMiddleware,createAboutpage);
aboutPageRouter.get("/",getAboutPage)





export default aboutPageRouter
