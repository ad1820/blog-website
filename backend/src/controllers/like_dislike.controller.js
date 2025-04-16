import { asyncHandler } from "../utils/asyncHandler.js"
import { Blog } from "../models/blog.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const getUserBlogAction = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found")

  const userId = req.user._id;

  let action = null;
  if (blog.likes.includes(userId)) action = "like"
  else if (blog.dislikes.includes(userId)) action = "dislike"

  res.status(200).json(new ApiResponse(200, { action }, "User action fetched"))
})

const likeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) throw new ApiError(404, "Blog not found")

  const userId = req.user._id

  blog.dislikes.pull(userId)
  if (!blog.likes.includes(userId)) blog.likes.push(userId)

  await blog.save()

  res.status(200).json(
    new ApiResponse(200, {
      likesCount: blog.likes.length,
      dislikesCount: blog.dislikes.length,
    }, "Blog liked")
  )
})

const unlikeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) throw new ApiError(404, "Blog not found")

  blog.likes.pull(req.user._id)

  await blog.save()

  res.status(200).json(
    new ApiResponse(200, {
      likesCount: blog.likes.length,
      dislikesCount: blog.dislikes.length,
    }, "Blog unliked")
  );
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) throw new ApiError(404, "Blog not found")

  const userId = req.user._id

  blog.likes.pull(userId)
  if (!blog.dislikes.includes(userId)) blog.dislikes.push(userId)

  await blog.save()

  res.status(200).json(
    new ApiResponse(200, {
      likesCount: blog.likes.length,
      dislikesCount: blog.dislikes.length,
    }, "Blog disliked")
  )
})

const undislikeBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) throw new ApiError(404, "Blog not found")

  blog.dislikes.pull(req.user._id)

  await blog.save()

  res.status(200).json(
    new ApiResponse(200, {
      likesCount: blog.likes.length,
      dislikesCount: blog.dislikes.length,
    }, "Blog undisliked")
  )
})

export {
  likeBlog,
  unlikeBlog,
  dislikeBlog,
  undislikeBlog,
  getUserBlogAction,
}
