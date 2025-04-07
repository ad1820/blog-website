// src/routes/blog.routes.js
import { Router } from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
import { createBlog } from "../controllers/createBlog.controller.js"
import { updateBlog } from "../controllers/updateBlog.controller.js"
import { deleteBlog } from "../controllers/deleteBlog.controller.js"

const router = Router()

router.route("/create").post(isAuthenticated, createBlog)
router.route("/update/:id").put(isAuthenticated, updateBlog)
router.route("/delete/:id").delete(isAuthenticated, deleteBlog)


export default router;
