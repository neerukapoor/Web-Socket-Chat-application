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
        console.log("yaha");
        user1.on("message", (data) => {
            const user1message = JSON.parse(data.toString());
            console.log(user1message);
            console.log("yaha inner");
            user2.send(JSON.stringify({
                message: user1message.message
            }));
        });
        console.log("idhar");
        user2.on("message", (data) => {
            const user2message = JSON.parse(data.toString());
            console.log(user2message);
            console.log("idhar inner");
            user1.send(JSON.stringify({
                message: user2message.message
            }));
        });
        console.log("aslkdhf");
    }
    removeUser(socket) {
    }
}
exports.ChatManager = ChatManager;
