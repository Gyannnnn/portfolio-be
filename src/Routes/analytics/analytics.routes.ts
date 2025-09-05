import { Router } from "express";
import { getStats, updateLike } from "../../controller/analytics/analytics.controller";
const analyticsRouter = Router();



analyticsRouter.get("/get",getStats);
analyticsRouter.put("/likes/update",updateLike);


export default analyticsRouter;