"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("../controllers/message"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const route = express_1.default.Router();
route.post("/send/:id", authMiddleware_1.authenticateJWTToken, message_1.default.sendMessage);
exports.default = route;
