import { useContext, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Button } from "@mui/material";

const ChatRoom = () => {
  const { tes, socket } = useContext(SocketContext);
  useEffect(() => {
    if (!socket) return;

    socket.on("chat message", (msg) => {
      console.log("Pesan baru:", msg);
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket]);
  return (
    <div className="mt-20">
      <h2>Status: {tes ? "🟢 Connected" : "🔴 Disconnected"}</h2>
      <button onClick={() => socket.emit("chat message", "Halo dari FE!")}>
        Kirim Pesan
      </button>
    </div>
  );
};
export default ChatRoom;
