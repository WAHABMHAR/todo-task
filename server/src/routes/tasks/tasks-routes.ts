import { Router } from "express";
import { protect } from "../../middlewares/authRoute.js";
import {
    createTask,
    deleteTask,
    getAllTasks,
    getTask,
    updateStatus,
    updateTask,
} from "../../controllers/tasks/task-controller.js";

const router = Router();

router.get("/", protect, getAllTasks);
router.get("/:id", protect, getTask);
router.post("/", protect, createTask);
router.put("/:id", protect, updateTask);
router.patch("/", protect, updateStatus);
router.delete("/:id", protect, deleteTask);

export default router;
