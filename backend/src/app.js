import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

//import routes
import userRouter from "./routes/user.routes.js"
//routes decleration
app.use("/api/users", userRouter)

import blogRouter from "./routes/blog.routes.js"
// new blog route
app.use("/api/blogs", blogRouter)

export {app}