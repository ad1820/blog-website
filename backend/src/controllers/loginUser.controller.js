import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const loginUser = asyncHandler(async(req, res) => {
    const {userName, email, password} = req.body
    if(!userName && !email){
        throw new ApiError(400, "Username/email is must")
    }
    const user = await User.findOne({
        $or: [{userName}, {email}]
    })
    if(!user){
        throw new ApiError(404, "Username/email does not exist!!!")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid Passowrd!!!")
    }
    const token = user.generateJWT()
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: process.env.NODE_ENV === 'production'
    })
    const userWithoutPassword = user.toObject()
    delete userWithoutPassword.password

    res.status(200).json(new ApiResponse(200, userWithoutPassword, "Login successful"))
})

export {loginUser}