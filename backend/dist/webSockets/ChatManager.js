"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatManager = void 0;
class ChatManager {
    constructor() {
        this.users = [];
        this.pendingUser = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.handler(socket);
    }
    handler(socket) {
        if (this.pendingUser) {
            this.startChat(socket, this.pendingUser);
        }
        else {
            this.pendingUser = socket;
        }
    }
    startChat(user1, user2) {
        user1.on("message", (data) => {
            const user1message = JSON.parse(data.toString());
            user2.send(JSON.stringify({
                message: user1message.message
            }));
        });
        user2.on("message", (data) => {
            const user2message = JSON.parse(data.toString());
            user1.send(JSON.stringify({
                message: user2message.message
            }));
        });
    }
    removeUser(socket) {
    }
}
exports.ChatManager = ChatManager;
