import { asyncHanlder } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"

const registerUser = asyncHanlder(async (req, res) => {
    const {userName, fullName, email, password} = req.body
    if([userName, fullName, email, password].some((field) => !field.trim())){
        throw new ApiError(400, "Empty fields found")
    }
    const existedUser = await User.findOne({
        $or: [{userName}, {email}]
    })
    if(existedUser){
        throw new ApiError(409, "Username/email already exist!!!")
    }
    const newUser = await User.create({userName, fullName, email, password})
    const token = newUser.generateJWT()
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "strict"
    })

    res.status(201).json(new ApiResponse(200, newUser, "User created successfully"))
})

export {registerUser}

