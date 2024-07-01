import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose'
const PORT = 3000;
import authRouter from './routes/auth';
import messageRouter from './routes/message'
import userRouter from './routes/user'
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config();
app.use(express.json());
app.use(cors());

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to MongoDB")
    }).catch((e) => {
        console.log(`Error connecting to MongoDB: ${e}`)
    })
}

app.use("/auth", authRouter);
app.use("/messages", messageRouter);
app.use("/users", userRouter)

app.get("/", (req,res) => {
	res.sendFile(path.join(__dirname, "index.html"));
})


app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`)
})