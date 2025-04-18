import dotenv from "dotenv"
import { connectDB } from "./db/index.js"
import { app } from "./app.js"

dotenv.config()

const startServer = async () =>{
    try {
        await connectDB()
        app.listen(process.env.PORT || 8000, () =>
            console.log(`Server started at port: ${process.env.PORT}`)
        )
    } catch (err) {
        console.error("MONGODB connection failed:", err)
    }
}

startServer()
