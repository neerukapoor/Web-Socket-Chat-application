"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const auth_1 = __importDefault(require("../controllers/auth"));
router.post('/signup', auth_1.default.signup);
router.post('/login', auth_1.default.login);
exports.default = router;
