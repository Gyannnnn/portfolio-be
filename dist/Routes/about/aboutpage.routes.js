"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aboutpage_controller_1 = require("../../controller/about/aboutpage.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const aboutPageRouter = (0, express_1.Router)();
aboutPageRouter.post("/create", auth_middleware_1.authMiddleware, aboutpage_controller_1.createAboutpage);
aboutPageRouter.get("/", aboutpage_controller_1.getAboutPage);
exports.default = aboutPageRouter;
