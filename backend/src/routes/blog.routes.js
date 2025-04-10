// src/routes/blog.routes.js
import { Router } from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
import { createBlog } from "../controllers/createBlog.controller.js"
import { updateBlog } from "../controllers/updateBlog.controller.js"
import { deleteBlog } from "../controllers/deleteBlog.controller.js"
import { likeBlog, dislikeBlog } from "../controllers/like_dislike.controller.js"
import { getAllBlogs, getSingleBlog } from "../controllers/blog.controller.js" 

const router = Router()

router.route("/create").post(isAuthenticated, createBlog)
router.route("/update/:id").put(isAuthenticated, updateBlog)
router.route("/delete/:id").delete(isAuthenticated, deleteBlog)
router.route("/like/:id").post(isAuthenticated, likeBlog) 
router.route("/dislike/:id").post(isAuthenticated, dislikeBlog)

router.route("/all").get(getAllBlogs)
router.route("/:id").get(getSingleBlog);




export default router
