import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controller.js";
import { loginUser } from "../controllers/loginUser.controller.js";

const router = Router()

router.route("/signUp").post(registerUser)
router.route("/login").post(loginUser)



export default router