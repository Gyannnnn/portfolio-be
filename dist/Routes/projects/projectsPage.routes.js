"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectPageRouter = (0, express_1.Router)();
const projectsPage_controller_1 = require("../../controller/projects/projectsPage.controller");
projectPageRouter.get("/", projectsPage_controller_1.getProjectsPage);
projectPageRouter.post("/create", projectsPage_controller_1.createProjectPage);
exports.default = projectPageRouter;
