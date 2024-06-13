import { Request, Response } from 'express'
import { Conversation } from '../models/conversation';
import { Message } from '../models/message';
import { Types } from 'mongoose';


// implement zod here
const sendMessage = async (req : Request , res: Response) => {
    try {
        const message = req.body.message;
        const receiverId = req.params.id;
        const senderId = req.headers["id"];

        let conversation = await Conversation.findOne({
            participants: { $all : [senderId, receiverId]}
        })

        if(!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        const messageId = newMessage._id;

        if(messageId) {
            conversation.messages.push(messageId as unknown as Types.ObjectId)
        }

        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage)
    }
    catch (error) {
        console.log("Error in send controller: ", (error as Error).message)
        res.status(500).json({error: "Internal Server error"})
    }
}

const getMessages = async (req : Request , res: Response) => {
    const receiverId = req.params.id;
    const senderId = req.headers["id"];

    const conversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]}
    }).populate("messages")

    res.status(200).json(conversation?.messages)

}

export default {
    sendMessage,
    getMessages
}