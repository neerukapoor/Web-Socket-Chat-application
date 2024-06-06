import express, { Request, Response } from "express";
import { WebSocket } from "ws";
import z from "zod";
import jwt from "jsonwebtoken"
import { User } from "../db/auth"
require('dotenv').config();

const router = express.Router();

interface User {
    email: string,
    password: string
}

interface userSchema {
    email: string,
    username: string,
    password: string
}

const inputSyntax = z.object({
    email: z.string().min(1).max(50),
    password: z.string().min(5).max(30)
})

router.post("/signup", async (req, res) => {
    try {
        checkInputSyntax(req, res)
        
        const input:User = req.body
        const email = input.email
        const password = input.password

        const isUserAlreadyPresent = await User.findOne({email});

        if(isUserAlreadyPresent) {
            return res.status(500).json({message:"User with this email already present"})
        }

        const emailAddressPrefix =  email.split('@');
        const uniqueEmailAddress = emailAddressPrefix[0];

        const user = await new User<userSchema>({
            email,
            username: uniqueEmailAddress,
            password,
        })
        await user.save().then(() => {
            console.log(`New user created successfully: ${user.email} `)
        }).catch((e) => {
            return res.status(500).json({message:`${e}`})
        });
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

        const input:User = req.body;
        const email = input.email;
        const password = input.password;
        const existingUser = await User.findOne({ email }).select('+password')
        if (
        !existingUser ||
        !existingUser.correctPassword(password, existingUser.password)
        ) {
        return res
            .status(401)
            .json({ error: 'Either Username or password is not correct ' })
        }
        const jwtToken = signJWT(req)
        console.log(`User logged in successfully: ${existingUser.username}`)
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
        email: req.body.email,
        password: req.body.password
    } 
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const jwtToken = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return jwtToken
}

export default router;