import { Blog } from "../models/blog.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getAllBlogs = asyncHandler(async(req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "userName")
            .sort({createdAt: -1})
    
        res.status(200).json(new ApiResponse(200, blogs, "All blogs fetched"))
    } catch (error) {
        console.error(error.message)
        throw new ApiError(500, "Error fetching blogs")
    }
})

const getSingleBlog = asyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate("author", "userName");

        if (!blog) throw new ApiError(404, "Blog not found")

        const responseData = {
            _id: blog._id,
            title: blog.title,
            body: blog.body,
            author: blog.author,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            likesCount: blog.likes.length,
            dislikesCount: blog.dislikes.length,
        };

        res.status(200).json(new ApiResponse(200, responseData, "Blog found successfully"))
    } catch (error) {
        console.error(error.message);
        throw new ApiError(500, "Error fetching blog")
    }
});


export {getAllBlogs, getSingleBlog}