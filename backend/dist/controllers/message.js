"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_1 = require("../models/conversation");
const message_1 = require("../models/message");
// implement zod here
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = req.body.message;
        const receiverId = req.params.id;
        const senderId = req.headers["id"];
        console.log("neeru in backend m " + message);
        console.log("neeru in backend ri " + receiverId);
        console.log("neeru in backend si " + senderId);
        let conversation = yield conversation_1.Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = yield conversation_1.Conversation.create({
                participants: [senderId, receiverId]
            });
        }
        const newMessage = new message_1.Message({
            senderId,
            receiverId,
            message
        });
        const messageId = newMessage._id;
        if (messageId) {
            conversation.messages.push(messageId);
        }
        yield Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in send controller: ", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
});
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receiverId = req.params.id;
        const senderId = req.headers["id"];
        const conversation = yield conversation_1.Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        if (!conversation) {
            return res.status(200).json([]);
        }
        res.status(200).json(conversation === null || conversation === void 0 ? void 0 : conversation.messages);
    }
    catch (error) {
        res.status(500).json({ error: `Error while reading messages: ${error}` });
    }
});
exports.default = {
    sendMessage,
    getMessages
};
