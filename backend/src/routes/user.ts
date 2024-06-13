import express from 'express'
const route = express.Router();
import userRouter from '../controllers/user'
import { authenticateJWTToken } from '../middleware/authMiddleware';

route.get("/", authenticateJWTToken, userRouter.getUsersForSideBar)

export default route;
