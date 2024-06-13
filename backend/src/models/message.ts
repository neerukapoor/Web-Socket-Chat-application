import mongoose, { Document, Types, mongo } from "mongoose";
import { User } from "./auth";

interface IMessage extends Document {
    senderId: Types.ObjectId,
    receiverId: Types.ObjectId,
    message: string
}

const messageSchema = new mongoose.Schema<IMessage>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true})


export const Message = mongoose.model("Message", messageSchema);