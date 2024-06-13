import mongoose, { Types, Document } from "mongoose";
import { Message } from "./message";

interface IConversation extends Document{
    participants: Types.ObjectId[],
    messages: Types.ObjectId[]
}

const conversationSchema = new mongoose.Schema<IConversation>({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: []
    }]
}, {timestamps: true})

export const Conversation = mongoose.model("Conversation", conversationSchema)