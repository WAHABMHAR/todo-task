import { Router } from "express";
import { protect } from "../../middlewares/authRoute.js";
import {
    createTask,
    deleteTask,
    getAllTasks,
    updateTask,
} from "../../controllers/tasks/task-controller.js";

const router = Router();

router.get("/", protect, getAllTasks);
router.post("/", protect, createTask);
router.patch("/", protect, updateTask);
router.delete("/", protect, deleteTask);

export default router;
