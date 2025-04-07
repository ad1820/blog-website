import { Blog } from "../models/blog.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const updateBlog = asyncHandler(async(req, res) => {
    const blogId = req.params.id
    const {title, body} = req.body
    if(!title || !body){
        throw new ApiError(400, "Title or Body is required to update")
    }

    const blog = await Blog.findById(blogId)
    if(!blog){
        throw new ApiError(400, "Blog not found")
    }

    if(blog.author.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You are not allowed to update this blog")
    }

    if(title) blog.title = title
    if(body) blog.body = body
    await blog.save()
    res.status(200).json(new ApiResponse(200, "Blog updated successfully"))
})

export {updateBlog}