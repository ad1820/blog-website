import { asyncHandler } from "../utils/asyncHandler.js"
import { Blog } from "../models/blog.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const likeBlog = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        throw new ApiError(404, "Blog not found")
    }
    const userId = req.user._id.toString()
    if(blog.likes.includes(userId)) blog.likes.pull(userId)
    else{
        blog.likes.push(userId)
        blog.dislikes.pull(userId)
    }
    await blog.save()
    
    res.status(200).json(new ApiResponse(200, "Like updated", {
        likes: blog.likes.length,
        dislikes: blog.dislikes.length
    }))
})

const dislikeBlog = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        throw new ApiError(404, "Blog not found")
    }
    const userId = req.user._id.toString()
    if(blog.dislikes.includes(userId)) blog.dislikes.pull(userId)
    else{
        blog.dislikes.push(userId)
        blog.likes.pull(userId)
    }
    await blog.save()
    
    res.status(200).json(new ApiResponse(200, "Dislike updated", {
        likes: blog.likes.length,
        dislikes: blog.dislikes.length
    }))
})


export {likeBlog, dislikeBlog}