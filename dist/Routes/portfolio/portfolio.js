"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolioRouter = (0, express_1.Router)();
const portfolio_controller_1 = require("../../controller/portfolio/portfolio.controller");
portfolioRouter.post("/create", portfolio_controller_1.createPortfolio);
exports.default = portfolioRouter;
