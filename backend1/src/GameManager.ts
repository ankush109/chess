import WebSocket from "ws";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];
  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }
  adduser(socket: WebSocket) {
    this.users.push(socket);
    this.handleMessage(socket);
  }
  removeUser(socket: WebSocket) {
    this.users = this.users.filter((x) => x !== socket);
  }
  private handleMessage(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === "init_game") {
        if (this.pendingUser) {
          // start the game
          const game = new Game(this.pendingUser, socket);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }
      if (message.type === "move") {
        const game = this.games.find(
          (game) => game.p1 === socket || game.p2 === socket
        );
        if (game) {
          game.makemove(socket, message.move);
        }
      }
    });
  }
}
