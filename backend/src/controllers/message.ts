import express, { Request, Response } from 'express'

const sendMessage = async (req : Request , res: Response) => {
    res.send("khada hu aaj bhi vhi")
}

export default {
    sendMessage
}