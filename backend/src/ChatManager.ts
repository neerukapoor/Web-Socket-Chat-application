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

        console.log("yaha");
        user1.on("message", (data) => {
            const user1message = JSON.parse(data.toString());
            console.log(user1message);
            console.log("yaha inner");
            user2.send(JSON.stringify({
                message: user1message.message
            }))
        })
        console.log("idhar")
        user2.on("message", (data) => {
            const user2message = JSON.parse(data.toString());
            console.log(user2message);
            console.log("idhar inner")
            user1.send(JSON.stringify({
                message: user2message.message
            }))
        })
        console.log("aslkdhf")
    }

    removeUser(socket: WebSocket) {

    }
}