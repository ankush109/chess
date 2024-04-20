import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useSocket } from "./useSocket";
import { Chess } from "chess.js";
import { Chessboard } from "./Chessboard";
function LandingPage() {
  const socket = useSocket();
  const [chess, setchess] = useState(new Chess());
  const [board, setboard] = useState(chess.board());

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case "init_game":
          setchess(new Chess());
          setboard(chess.board());
          console.log("game initialized");
          break;
        case "move":
          const move = message.payload;
          chess.move(move);
          setboard(chess.board());
          console.log("move made");
          break;
        case "game_over":
          console.log("game over");
          break;
      }
    };
  }, [socket]);
  if (!socket) return <div>connecting....</div>;
  return (
    <div className="flex justify-center">
      <div className="pt-9 w-full ">
        <div className="grid grid-cols-6 gap-2">
          <div className="col-span-4 w-full flex justify-center">
            <Chessboard socket={socket} board={board} />
          </div>
          <div className=" flex flex-col justify-center">
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      type: "init_game",
                    })
                  );
                }}
              >
                Play
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
