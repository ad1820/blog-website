import { Router } from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
import { createBlog } from "../controllers/createBlog.controller.js"
import { updateBlog } from "../controllers/updateBlog.controller.js"
import { deleteBlog } from "../controllers/deleteBlog.controller.js"
import {
  likeBlog,
  unlikeBlog,
  dislikeBlog,
  undislikeBlog,
  getUserBlogAction,
} from "../controllers/like_dislike.controller.js"
import {
  getAllBlogs,
  getSingleBlog,
} from "../controllers/blog.controller.js"

const router = Router();

// Blog CRUD
router.route("/")
  .post(isAuthenticated, createBlog)
  .get(getAllBlogs);

router.route("/:id")
  .put(isAuthenticated, updateBlog)
  .delete(isAuthenticated, deleteBlog)
  .get(getSingleBlog);

// Like/Dislike actions
router.route("/like/:id").post(isAuthenticated, likeBlog)
router.route("/unlike/:id").post(isAuthenticated, unlikeBlog)
router.route("/dislike/:id").post(isAuthenticated, dislikeBlog)
router.route("/undislike/:id").post(isAuthenticated, undislikeBlog)

// Get user’s like/dislike status on blog
router.route("/action/:id").get(isAuthenticated, getUserBlogAction)


export default router;
