import express from 'express'
import { User } from '../db/auth';
import z from 'zod'
import { ChatManager } from '../webSockets/ChatManager';
import { WebSocket } from 'ws';

const router = express.Router();

const inputValidator = z.object({
    username: z.string()
})

const chatManager = new ChatManager();

// todo authentication here
router.post("/landing", async (req,res) => {

    const parsedInput = inputValidator.safeParse(req.body)
    if(!parsedInput.success) {
        return res.status(411).json({msg:parsedInput.error})
    }

    // const currentUser = await User.findOne({username: "15sbxhrt0lx3nhxi0"})
    const anotherUser = await User.findOne({username: req.body.username}).select("+webSocket")
    if(!anotherUser) {
        return res.status(404).json({message:"Given username does not exist."})
    }
    

    console.log("pehel")

    if (!anotherUser) {
        return res.status(404).json({ message: "Given username does not exist." });
    }

    if (!anotherUser.webSocket) {
        return res.status(500).json({ message: "WebSocket not available for the user." });
    }


    // start work from here 
    // Check if anotherUser.webSocket is a WebSocket object
    if (!(anotherUser.webSocket instanceof WebSocket)) {
        return res.status(500).json({ message: "WebSocket is not properly initialized." });
    }

    console.log("sldhf")

    if(anotherUser) {
        if(anotherUser.webSocket) {
            anotherUser.webSocket.on('open', function () {
                console.log("[open] Connection established");
                console.log("Sending message to server");
                // You can send a message here or perform any other actions
                anotherUser.webSocket?.send("My name is Kapoor");
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

    console.log("yaha")

    // chatManager.startChat(currentUser?.webSocket ?? null, anotherUser?.webSocket ?? null)

    res.status(200).json({message: "Connected successfully with another user"})
})

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


export default router;