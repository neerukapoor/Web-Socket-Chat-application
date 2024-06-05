"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ChatManager_1 = require("./ChatManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const chatManager = new ChatManager_1.ChatManager();
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    chatManager.addUser(ws);
    ws.on("disconnect", () => { chatManager.removeUser(ws); });
});
