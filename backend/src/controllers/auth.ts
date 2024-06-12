import express, { Request, Response } from "express";
import { WebSocket } from "ws";
import z from "zod";
import jwt from "jsonwebtoken"
import uniqid from 'uniqid';
import { User } from "../db/auth"
import { sign } from "crypto";
require('dotenv').config();

const router = express.Router();

interface User {
    email: string,
    password: string
    username: string
}

const signupInputSyntax = z.object({
    email: z.string().min(1).max(50),
    username: z.string().min(3).max(30),
    password: z.string().min(5).max(30)
})

const loginInputSyntax = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(5).max(30)
})

const signup = async (req: Request, res: Response) => {
    try {
        checkSignupInputSyntax(req, res)
        
        const input:User = req.body
        const email = input.email
        const username = input.username
        const password = input.password

        const isUserAlreadyPresent = await User.findOne({email});

        if(isUserAlreadyPresent) {
            return res.status(500).json({message:"User with this email already present"})
        }

        const isUsernameAlreadyPresent = await User.findOne({ username });
        if (isUsernameAlreadyPresent) {
            return res.status(500).json({ message: "Username already taken, please provide another username" });
        }

        const user = await new User<User>({
            email,
            username: username,
            password
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
}

const login = async(req: Request, res: Response) => {
    try {
        checkLoginInputSyntax(req, res)

        const input:User = req.body;
        const username = input.username;
        const password = input.password;
        const existingUser = await User.findOne({ username }).select('+password')
        if (
        !existingUser ||
        !existingUser.correctPassword(password, existingUser.password)
        ) {
        return res
            .status(401)
            .json({ error: 'Either email or password is not correct ' })
        }
        const jwtToken = signJWT(req)
        console.log(`User logged in successfully: ${existingUser.username}`)
        res.status(200).json({message: "Login Successfull", jwtToken})
    } catch(e) {
        console.log(`Error while loging in ${e}`)
        res.status(500).json({error:`An error occured while loging in ${e}`})
    }
}

function checkSignupInputSyntax(req : Request, res : Response) {
    const parsedInput = signupInputSyntax.safeParse(req.body)
    if(!parsedInput.success) {
        return res.status(411).json({msg:parsedInput.error})
    }
}

function checkLoginInputSyntax(req : Request, res : Response) {
    const parsedInput = loginInputSyntax.safeParse(req.body)
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

export default {
    signup,
    login
};