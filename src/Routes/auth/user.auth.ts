import { Router } from "express";
import { signIn, signUp } from "../../controller/auth.controller";
const authRouter = Router();


authRouter.post("/signup",signUp);
authRouter.post("/signin",signIn)



export default authRouter