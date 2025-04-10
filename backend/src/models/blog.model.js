import mongoose, {Schema} from "mongoose"

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    dislikes: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

export const Blog = mongoose.model("Blog", blogSchema)