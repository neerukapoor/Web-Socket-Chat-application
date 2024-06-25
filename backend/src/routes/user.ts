import express from 'express'
const route = express.Router();
import userRouter from '../controllers/user'
import { authenticateJWTToken } from '../middleware/authMiddleware';

route.get("/", userRouter.getUsersForSideBar)

export default route;
