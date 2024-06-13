import {Request, Response} from 'express'
import { User } from '../models/auth'

const getUsersForSideBar = async (req : Request, res : Response) => {
    try {
        const loggedInUser = req.headers["id"]
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch(e) {
        res.status(500).json({error: `Error in fetching users details ${e}`})
    }
}

export default {
    getUsersForSideBar
}