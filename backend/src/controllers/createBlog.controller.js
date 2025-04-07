import { Blog } from "../models/blog.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createBlog = asyncHandler(async(req, res) => {
    const {title, body} = req.body
    if(!title && !body){
        throw new ApiError(400, "Title and Body are must")
    }
    const userId = req.user?._id
    if(!userId){
        throw new ApiError(400, "User must login first")
    }

    const newBlog = await Blog.create({title, body, author:userId})

    res.status(201).json(new ApiResponse(201, newBlog, "Blog created successfully!!!"))
    
})

export {createBlog}