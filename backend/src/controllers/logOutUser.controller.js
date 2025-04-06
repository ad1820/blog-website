import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,      
    sameSite: "strict" // prevents CSRF
  });

  return res.status(200).json(
    new ApiResponse(200, null, "User logged out successfully")
  );
});

export { logoutUser };
