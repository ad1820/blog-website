// controllers/user.controller.js

import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";


const getCurrentUser = asyncHandler(async (req, res) => {
  //console.log("req.user in /me:", req.user); 
  if(!req.user){
    throw new ApiError(401, "Not authenticated")
  }
  res.status(200).json(new ApiResponse(200, { user: req.user }, "User info fetched"));
})

export { getCurrentUser }
