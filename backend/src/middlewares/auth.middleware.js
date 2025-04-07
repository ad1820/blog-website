import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;
    if(!token){
        throw new ApiError(401, "Unauthorized: No token provided");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized: Invalid token");
    }
});

export { isAuthenticated };