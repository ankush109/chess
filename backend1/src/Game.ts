import { Chess } from "chess.js";
import WebSocket from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  public p1: WebSocket;
  public p2: WebSocket;
  public board: Chess;
  public starttime: Date;
  public moveCount: number;
  constructor(p1: WebSocket, p2: WebSocket) {
    this.p1 = p1;
    this.p2 = p2;
    this.board = new Chess();
    this.starttime = new Date();
    this.moveCount = 0;
    this.p1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.p2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }
  makemove(
    socket: WebSocket,
    move: {
      from: string;
      to: string;
    }
  ) {
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
    } catch (err) {
      console.log(err);
    }
    if (this.board.isGameOver()) {
      // send the message to both
      this.p1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() == "w" ? "black" : "white",
          },
        })
      );
      this.p2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() == "w" ? "black" : "white",
          },
        })
      );
    }
    if (this.moveCount % 2 === 0) {
      this.p2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      this.p1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
    this.moveCount++;
  }
}
