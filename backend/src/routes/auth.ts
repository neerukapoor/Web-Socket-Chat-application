import express, { Request, Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken"
require('dotenv').config();

const router = express.Router();

const inputSyntax = z.object({
    username: z.string().min(1).max(12),
    password: z.string().min(5).max(20)
})

router.post("/signup", async (req, res) => {
    try {
        checkInputSyntax(req, res)
        const jwtToken = signJWT(req)
        res.status(200).json({message: "Signup Successfull", jwtToken})
    } catch(e) {
        console.log(`Error while signing up ${e}`)
        res.status(500).json({error:`An error occured while signing up ${e}`})
    }
})

router.post("/login", async(req, res) => {
    try {
        checkInputSyntax(req, res)
        const jwtToken = signJWT(req)
        res.status(200).json({message: "Login Successfull", jwtToken})
    } catch(e) {
        console.log(`Error while loging in ${e}`)
        res.status(500).json({error:`An error occured while loging in ${e}`})
    }
})

function checkInputSyntax(req : Request, res : Response) {
    const parsedInput = inputSyntax.safeParse(req.body)
    if(!parsedInput.success) {
        return res.status(411).json({msg:parsedInput.error})
    }
}

function signJWT(req: Request) {
    const user = {
        username: req.body.username,
        password: req.body.password
    } 
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const jwtToken = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return jwtToken
}

export default router;