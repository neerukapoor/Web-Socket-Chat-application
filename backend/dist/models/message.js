"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("./auth");
const messageSchema = new mongoose_1.default.Schema({
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: auth_1.User,
        required: true
    },
    receiverId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: auth_1.User,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.Message = mongoose_1.default.model("Message", messageSchema);
