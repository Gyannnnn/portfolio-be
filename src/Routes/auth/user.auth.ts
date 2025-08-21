import { Router } from "express";
import { me, signIn, signUp } from "../../controller/auth.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
const authRouter = Router();


authRouter.post("/signup",signUp);
authRouter.post("/signin",signIn);
authRouter.get("/me",authMiddleware,me);



export default authRouter