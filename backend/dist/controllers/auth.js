"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../models/auth");
require('dotenv').config();
const signupInputSyntax = zod_1.default.object({
    email: zod_1.default.string().min(1).max(50),
    username: zod_1.default.string().min(3).max(30),
    password: zod_1.default.string().min(5).max(30),
    gender: zod_1.default.enum(['female', 'male'])
});
const loginInputSyntax = zod_1.default.object({
    username: zod_1.default.string().min(3).max(30),
    password: zod_1.default.string().min(5).max(30)
});
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        checkSignupInputSyntax(req, res);
        const input = req.body;
        const email = input.email;
        const username = input.username;
        const password = input.password;
        const gender = input.gender;
        const isUserAlreadyPresent = yield auth_1.User.findOne({ email });
        if (isUserAlreadyPresent) {
            return res.status(500).json({ message: "User with this email already present" });
        }
        const isUsernameAlreadyPresent = yield auth_1.User.findOne({ username });
        if (isUsernameAlreadyPresent) {
            return res.status(500).json({ message: "Username already taken, please provide another username" });
        }
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const user = yield new auth_1.User({
            email,
            username: username,
            password,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });
        yield user.save().then(() => {
            console.log(`New user created successfully: ${user.email} `);
        }).catch((e) => {
            return res.status(500).json({ message: `${e}` });
        });
        const id = user._id;
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const jwtToken = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Signup Successfull", jwtToken });
    }
    catch (e) {
        console.log(`Error while signing up ${e}`);
        res.status(500).json({ error: `An error occured while signing up ${e}` });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        checkLoginInputSyntax(req, res);
        const input = req.body;
        const username = input.username;
        const password = input.password;
        const existingUser = yield auth_1.User.findOne({ username }).select('+password');
        if (!existingUser ||
            !existingUser.correctPassword(password, existingUser.password)) {
            return res
                .status(401)
                .json({ error: 'Either email or password is not correct ' });
        }
        const id = existingUser._id;
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const jwtToken = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(`User logged in successfully: ${existingUser.username}`);
        res.status(200).json({ message: "Login Successfull", jwtToken });
    }
    catch (e) {
        console.log(`Error while loging in ${e}`);
        res.status(500).json({ error: `An error occured while loging in ${e}` });
    }
});
function checkSignupInputSyntax(req, res) {
    const parsedInput = signupInputSyntax.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ msg: parsedInput.error });
    }
}
function checkLoginInputSyntax(req, res) {
    const parsedInput = loginInputSyntax.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ msg: parsedInput.error });
    }
}
exports.default = {
    signup,
    login
};
