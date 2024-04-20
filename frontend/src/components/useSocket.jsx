import { useEffect, useState } from "react";

export const useSocket = () => {
  const [socket, setsocket] = useState(null);
  useEffect(() => {
    const ws = new WebSocket("");
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onclose = () => {
      console.log("disconnected");
    };
  }, []);
  return socket;
};
