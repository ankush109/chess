"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.board = new chess_js_1.Chess();
        this.starttime = new Date();
        this.moveCount = 0;
        this.p1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.p2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    makemove(socket, move) {
        // validate the type of move
        // is this users move
        // is the move valid
        // update the move
        // push the move
        // send the updated board to both the players
        console.log("came here");
        if (this.moveCount % 2 == 0 && socket != this.p1) {
            return;
        }
        if (this.moveCount % 2 != 0 && socket != this.p2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (err) {
            console.log(err);
        }
        if (this.board.isGameOver()) {
            // send the message to both
            this.p1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "black" : "white",
                },
            }));
            this.p2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "black" : "white",
                },
            }));
        }
        if (this.moveCount % 2 === 0) {
            this.p2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move,
            }));
        }
        else {
            this.p1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move,
            }));
        }
        this.moveCount++;
    }
}
exports.Game = Game;
