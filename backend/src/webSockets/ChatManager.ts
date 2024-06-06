import { WebSocket } from "ws";

export class ChatManager {
    private users: WebSocket[];
    private pendingUser: WebSocket | null;
    constructor() {
        this.users = [];
        this.pendingUser = null;
    }

    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.handler(socket);
    }

    handler(socket: WebSocket) {   
        if(this.pendingUser) {
            this.startChat(socket, this.pendingUser)
        }
        else {
            this.pendingUser = socket;
        }
    }

    startChat(user1 : WebSocket, user2 : WebSocket) {

        user1.on("message", (data) => {
            const user1message = JSON.parse(data.toString());
            user2.send(JSON.stringify({
                message: user1message.message
            }))
        })
        user2.on("message", (data) => {
            const user2message = JSON.parse(data.toString());
            user1.send(JSON.stringify({
                message: user2message.message
            }))
        })
    }

    removeUser(socket: WebSocket) {

    }
}