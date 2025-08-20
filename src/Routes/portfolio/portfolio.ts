import { Router } from "express";
const portfolioRouter = Router();

import { createPortfolio } from "../../controller/portfolio/portfolio.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

portfolioRouter.post("/create",authMiddleware, createPortfolio);

export default portfolioRouter;
