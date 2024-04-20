import { Color, PieceSymbol, SQUARES, Square } from "chess.js";
import React, { useEffect, useState } from "react";

export const Chessboard = ({
  board,
  socket,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setfrom] = useState<Square | null>();
  const [to, setto] = useState<Square | null>(null);

  return (
    <div className="text-white">
      {board.map((row, i) => {
        return (
          <div className="flex ">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;
              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setfrom(squareRepresentation);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: "move",
                          payload: {
                            from,
                            to: squareRepresentation,
                          },
                        })
                      );
                    }

                    console.log({ squareRepresentation, from });
                  }}
                  className={`w-16 h-16 ${
                    (i + j) % 2 == 0 ? "bg-white text-black" : "bg-black"
                  }  `}
                >
                  <div className="w-full flex justify-center h-full">
                    <div className="flex flex-col justify-center ">
                      {square ? square.type : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
