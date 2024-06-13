import express from "express";
import messageRouter from "../controllers/message"
import { authenticateJWTToken } from "../middleware/authMiddleware";

const route = express.Router();

route.post("/send/:id", authenticateJWTToken , messageRouter.sendMessage);

export default route;