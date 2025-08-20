"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controller/auth.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", auth_controller_1.signUp);
authRouter.post("/signin", auth_middleware_1.authMiddleware, auth_controller_1.signIn);
exports.default = authRouter;
