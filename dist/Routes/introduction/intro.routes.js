"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const introductionRouter = (0, express_1.Router)();
const intro_controller_1 = require("../../controller/intro.controller");
introductionRouter.get("/get", intro_controller_1.getIntro);
exports.default = introductionRouter;
