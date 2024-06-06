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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../db/auth");
const zod_1 = __importDefault(require("zod"));
const ChatManager_1 = require("../webSockets/ChatManager");
const ws_1 = require("ws");
const router = express_1.default.Router();
const inputValidator = zod_1.default.object({
    username: zod_1.default.string()
});
const chatManager = new ChatManager_1.ChatManager();
// todo authentication here
router.post("/landing", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = inputValidator.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ msg: parsedInput.error });
    }
    // const currentUser = await User.findOne({username: "15sbxhrt0lx3nhxi0"})
    const anotherUser = yield auth_1.User.findOne({ username: req.body.username }).select("+webSocket");
    if (!anotherUser) {
        return res.status(404).json({ message: "Given username does not exist." });
    }
    console.log("pehel");
    if (!anotherUser) {
        return res.status(404).json({ message: "Given username does not exist." });
    }
    if (!anotherUser.webSocket) {
        return res.status(500).json({ message: "WebSocket not available for the user." });
    }
    // Check if anotherUser.webSocket is a WebSocket object
    if (!(anotherUser.webSocket instanceof ws_1.WebSocket)) {
        return res.status(500).json({ message: "WebSocket is not properly initialized." });
    }
    console.log("sldhf");
    if (anotherUser) {
        if (anotherUser.webSocket) {
            anotherUser.webSocket.on('open', function () {
                var _a;
                console.log("[open] Connection established");
                console.log("Sending message to server");
                // You can send a message here or perform any other actions
                (_a = anotherUser.webSocket) === null || _a === void 0 ? void 0 : _a.send("My name is Kapoor");
            });
        }
    }
    // if(anotherUser) {
    //     if(anotherUser.webSocket) {
    //         anotherUser.webSocket.onopen = function(e) {
    //             alert("[open] Connection established");
    //             alert("Sending to server");
    //             if(anotherUser.webSocket) {
    //                 console.log("idhar")
    //                 anotherUser.webSocket.send("My name is John");
    //             }
    //         };
    //     }
    // }
    console.log("yaha");
    // chatManager.startChat(currentUser?.webSocket ?? null, anotherUser?.webSocket ?? null)
    res.status(200).json({ message: "Connected successfully with another user" });
}));
// Handle message exchange route
// router.post("/send-message", async (req, res) => {
//     const { username, message } = req.body;
//     const user = await User.findOne({ username }).select("+webSocket");
//     if (!user || !user.webSocket) {
//         return res.status(404).json({ message: "User not found or WebSocket not available" });
//     }
//     // Send message to the user's WebSocket
//     user.webSocket.send(JSON.stringify({
//         from: "currentUser",
//         message: message
//     }));
//     res.status(200).json({ message: "Message sent successfully" });
// });
exports.default = router;
