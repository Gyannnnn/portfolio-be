"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controller/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", auth_controller_1.signUp);
authRouter.post("/signin", auth_controller_1.signIn);
exports.default = authRouter;
