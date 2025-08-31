import { Router } from "express";
const skillRouter = Router();



import { addNewSkill, createSkillSection, deleteSkill, getSkillSection, updateSkillSection } from "../../controller/skill/skill.controller";
import { authMiddleware } from "../../middleware/auth.middleware";


skillRouter.get("/get",getSkillSection);
skillRouter.post("/create",authMiddleware,createSkillSection);
skillRouter.put("/update",authMiddleware,updateSkillSection);
skillRouter.post("/add-skill",authMiddleware,addNewSkill);
skillRouter.delete("/delete-skill", authMiddleware,deleteSkill);



export default skillRouter;