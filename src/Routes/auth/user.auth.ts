import { Router } from "express";
import { signIn, signUp } from "../../controller/auth.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
const authRouter = Router();


authRouter.post("/signup",signUp);
authRouter.post("/signin",authMiddleware,signIn)



export default authRouter