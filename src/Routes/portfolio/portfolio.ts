import { Router } from "express";
const portfolioRouter = Router();

import { createPortfolio } from "../../controller/portfolio/portfolio.controller";

portfolioRouter.post("/create", createPortfolio);

export default portfolioRouter;
