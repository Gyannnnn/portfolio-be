import { Router } from "express";
import { createAboutpage, getAboutPage } from "../../controller/about/aboutpage.controller";
const aboutPageRouter = Router();


aboutPageRouter.post("/create",createAboutpage);
aboutPageRouter.get("/",getAboutPage)





export default aboutPageRouter
