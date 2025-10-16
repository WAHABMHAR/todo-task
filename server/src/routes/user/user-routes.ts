import { Router } from "express";
import {
    createUser,
    getAuthUser,
    loginUser,
    subscribeNewsletter,
    verifyUser,
} from "../../controllers/user/user-controller.js";

const router = Router();

router.post("/signup", createUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.get("/authUser", getAuthUser);
router.post("/newsletter", subscribeNewsletter);

export default router;
