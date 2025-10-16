import { Router } from "express";
import userRoutes from "./user/user-routes.js";
import taskRoutes from "./tasks/tasks-routes.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;
