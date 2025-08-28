"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const introductionRouter = (0, express_1.Router)();
const intro_controller_1 = require("../../controller/introduction/intro.controller");
introductionRouter.get("/get", intro_controller_1.getIntro);
introductionRouter.put("/update", intro_controller_1.updateIntro);
exports.default = introductionRouter;
