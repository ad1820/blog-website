import { Router } from "express"
import { registerUser } from "../controllers/registerUser.controller.js"
import { loginUser } from "../controllers/loginUser.controller.js"
import { logoutUser } from "../controllers/logOutUser.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
import { getCurrentUser } from "../controllers/getUser.controller.js" 

const router = Router()

router.route("/signUp").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logOut").post(isAuthenticated, logoutUser)
router.route("/me").get(isAuthenticated, getCurrentUser)



export default router