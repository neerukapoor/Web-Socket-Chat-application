import { WebSocketServer } from 'ws';
import { ChatManager } from './ChatManager';

const wss = new WebSocketServer({ port: 8080 });

const chatManager = new ChatManager();

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    chatManager.addUser(ws);

    ws.on("disconnect", () => {chatManager.removeUser(ws)})
});
