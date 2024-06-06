"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ChatManager_1 = require("./webSockets/ChatManager");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = 3000;
const auth_1 = __importDefault(require("./routes/auth"));
const chat_1 = __importDefault(require("./routes/chat"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const wss = new ws_1.WebSocketServer({ port: 8080 });
const chatManager = new ChatManager_1.ChatManager();
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    chatManager.addUser(ws);
    ws.on("disconnect", () => { chatManager.removeUser(ws); });
});
if (process.env.MONGODB_URI) {
    mongoose_1.default.connect(process.env.MONGODB_URI).then(() => {
        console.log("Connected to MongoDB");
    }).catch((e) => {
        console.log(`Error connecting to MongoDB: ${e}`);
    });
}
app.use("/auth", auth_1.default);
app.use("/chat", chat_1.default);
app.listen(3000, () => {
    console.log(`Server listning on port ${PORT}`);
});
