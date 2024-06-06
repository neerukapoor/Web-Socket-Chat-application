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
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../db/auth");
require('dotenv').config();
const router = express_1.default.Router();
const inputSyntax = zod_1.default.object({
    email: zod_1.default.string().min(1).max(50),
    password: zod_1.default.string().min(5).max(30)
});
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        checkInputSyntax(req, res);
        const input = req.body;
        const email = input.email;
        const password = input.password;
        const isUserAlreadyPresent = yield auth_1.User.findOne({ email });
        if (isUserAlreadyPresent) {
            return res.status(500).json({ message: "User with this email already present" });
        }
        const emailAddressPrefix = email.split('@');
        const uniqueEmailAddress = emailAddressPrefix[0];
        const user = yield new auth_1.User({
            email,
            username: uniqueEmailAddress,
            password,
        });
        yield user.save().then(() => {
            console.log(`New user created successfully: ${user.email} `);
        }).catch((e) => {
            return res.status(500).json({ message: `${e}` });
        });
        const jwtToken = signJWT(req);
        res.status(200).json({ message: "Signup Successfull", jwtToken });
    }
    catch (e) {
        console.log(`Error while signing up ${e}`);
        res.status(500).json({ error: `An error occured while signing up ${e}` });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        checkInputSyntax(req, res);
        const input = req.body;
        const email = input.email;
        const password = input.password;
        const existingUser = yield auth_1.User.findOne({ email }).select('+password');
        if (!existingUser ||
            !existingUser.correctPassword(password, existingUser.password)) {
            return res
                .status(401)
                .json({ error: 'Either Username or password is not correct ' });
        }
        const jwtToken = signJWT(req);
        console.log(`User logged in successfully: ${existingUser.username}`);
        res.status(200).json({ message: "Login Successfull", jwtToken });
    }
    catch (e) {
        console.log(`Error while loging in ${e}`);
        res.status(500).json({ error: `An error occured while loging in ${e}` });
    }
}));
function checkInputSyntax(req, res) {
    const parsedInput = inputSyntax.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ msg: parsedInput.error });
    }
}
function signJWT(req) {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const jwtToken = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return jwtToken;
}
exports.default = router;
