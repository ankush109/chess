"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    adduser(socket) {
        this.users.push(socket);
        this.handleMessage(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((x) => x !== socket);
    }
    handleMessage(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === "init_game") {
                if (this.pendingUser) {
                    // start the game
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === "move") {
                const game = this.games.find((game) => game.p1 === socket || game.p2 === socket);
                if (game) {
                    game.makemove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
