import { Blog } from "../models/blog.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const deleteBlog = asyncHandler(async(req, res) => {
    const blogId = req.params.id

    const blog = await Blog.findById(blogId)
    if(!blog){
        throw new ApiError(400, "Blog not found")
    }

    if(blog.author.toString() !== req.user._id.toString()){
        throw new ApiError(403, "You are not allowed to delete this blog")
    }

    await blog.deleteOne()
    res.status(200).json(new ApiResponse(200, "Blog deleted successfully"))
})

export {deleteBlog}