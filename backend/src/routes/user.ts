import express from 'express'
const route = express.Router();
import userRouter from '../controllers/user'
import { authenticateJWTToken } from '../middleware/authMiddleware';

route.get("/", authenticateJWTToken, userRouter.getUsersForSideBar)
route.get("/loggedInuser", authenticateJWTToken, userRouter.getCurrentUser)

export default route;
