"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("../controllers/message"));
const route = express_1.default.Router();
route.get("/:id", message_1.default.getMessages);
route.post("/send/:id", message_1.default.sendMessage);
exports.default = route;
