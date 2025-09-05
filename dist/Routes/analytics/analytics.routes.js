"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../../controller/analytics/analytics.controller");
const analyticsRouter = (0, express_1.Router)();
analyticsRouter.get("/get", analytics_controller_1.getStats);
analyticsRouter.put("/likes/update", analytics_controller_1.updateLike);
exports.default = analyticsRouter;
