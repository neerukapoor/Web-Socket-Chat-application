import express from "express";
import messageRouter from "../controllers/message"
import { authenticateJWTToken } from "../middleware/authMiddleware";

const route = express.Router();

route.get("/:id" , messageRouter.getMessages);
route.post("/send/:id" , messageRouter.sendMessage);

export default route;