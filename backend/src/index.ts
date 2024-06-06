import { WebSocketServer } from 'ws';
import { ChatManager } from './ChatManager';
import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose'
const PORT = 3000;
import authRouter from './routes/auth';
import * as dotenv from 'dotenv';
dotenv.config();
app.use(express.json());
app.use(cors());


// pick this part later
// const wss = new WebSocketServer({ port: 8080 });

// const chatManager = new ChatManager();

// wss.on('connection', function connection(ws) {
//     ws.on('error', console.error);
//     chatManager.addUser(ws);

//     ws.on("disconnect", () => {chatManager.removeUser(ws)})
// });

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to MongoDB")
    }).catch((e) => {
        console.log(`Error connecting to MongoDB: ${e}`)
    })
}

app.use("/auth", authRouter);

app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`)
})