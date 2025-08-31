// import { X } from "lucide-react";
// import { useContext, useEffect, useRef, useState } from "react";
// import { SideBarContext } from "../../../context/SideBarContext";
// import { SocketIoContext } from "../../../context/SocketIoContext";
// import { AuthContext } from "../../../context/AuthContext";
// import axios from "axios";
// import dayjs from "dayjs";

// const ChatSidebar = () => {
//   const { activeSidebar, closeSidebar } = useContext(SideBarContext);
//   const socket = useContext(SocketIoContext);
//   const { pengguna, token } = useContext(AuthContext);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const ADMIN_ID = 1;
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_APP_API_BASE_URL}/send-message`,
//         {
//           receiveId: ADMIN_ID,
//           content: input,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       socket.emit("sendMessage", {
//         sendId: pengguna.id,
//         receiveId: ADMIN_ID,
//         content: input,
//       });

//       //   setMessages((prev) => [...prev, { senderId: pengguna.id, text: input }]);
//       //   setMessages((prev) => [
//       //     ...prev,
//       //     { sendId: pengguna.id, receiveId: ADMIN_ID, content: input },
//       //   ]);
//       setMessages((prev) => [
//         ...prev,
//         {
//           sendId: pengguna.id,
//           receiveId: ADMIN_ID,
//           content: input,
//           createdAt: new Date().toISOString(),
//         },
//       ]);

//       setInput("");
//     } catch (err) {
//       console.error("Gagal kirim pesan:", err);
//     }
//   };

//   useEffect(() => {
//     if (!pengguna) return;
//     axios
//       .get(
//         `${
//           import.meta.env.VITE_APP_API_BASE_URL
//         }/get-message?partnerId=${ADMIN_ID}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => setMessages(res.data.data))
//       .catch((err) => console.error(err));
//   }, [pengguna]);

//   useEffect(() => {
//     socket.on("receiveMessage", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//     };
//   }, [socket]);

//   useEffect(() => {
//     if (pengguna?.id) {
//       socket.emit("joinRoom", pengguna.id);
//       console.log("Join room:", pengguna.id);
//     }
//   }, [pengguna, socket]);
//   const formatTime = (dateString) => {
//     return dayjs(dateString).format("HH:mm, DD MMM");
//   };
//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
//         activeSidebar === "chat" ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       <div className="flex justify-between items-center p-4 border-b">
//         <h2 className="text-lg font-semibold">Chat Kami</h2>
//         <button onClick={closeSidebar}>
//           <X />
//         </button>
//       </div>

//       {/* CHAT LIST */}
//       <div className="p-4 overflow-y-auto h-[calc(100%-120px)] space-y-2">
//         {/* {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded-lg max-w-[70%] ${
//               m.sendId === pengguna.id
//                 ? "bg-blue-500 text-white ml-auto"
//                 : "bg-gray-200 text-black"
//             }`}
//           >
//             {m.content}
//           </div>
//         ))} */}
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded-lg max-w-[70%] ${
//               m.sendId === pengguna.id
//                 ? "bg-blue-500 text-white ml-auto"
//                 : "bg-gray-200 text-black"
//             }`}
//           >
//             <div>{m.content}</div>
//             <div className="text-xs opacity-70 mt-1 text-right">
//               {formatTime(m.createdAt)}
//             </div>
//           </div>
//         ))}

//         <div ref={chatEndRef} />
//       </div>

//       {/* INPUT BOX */}
//       <div className="p-2 border-t flex gap-1">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ketik pesan..."
//           className="flex-1 border rounded-lg px-2 py-2"
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-600 text-white px-3 rounded-lg"
//         >
//           Kirim
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatSidebar;

import { X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { SideBarContext } from "../../../context/SideBarContext";
import { SocketIoContext } from "../../../context/SocketIoContext";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import dayjs from "dayjs";

const ChatSidebar = () => {
  const { activeSidebar, closeSidebar } = useContext(SideBarContext);
  const socket = useContext(SocketIoContext);
  const { pengguna, token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ADMIN_ID = 1;
  const chatEndRef = useRef(null);
  // ...
  useEffect(() => {
    if (pengguna?.id) {
      socket.emit("joinRoom", pengguna.id);
      console.log("Join room:", pengguna.id);
    }
  }, [pengguna, socket]);

  // 🔍 Debug koneksi socket
  useEffect(() => {
    console.log("Socket connected (first render):", socket.id);

    socket.on("connect", () => {
      console.log("Socket reconnected:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, [socket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //   const handleSend = async () => {
  //     if (!input.trim()) return;

  //     try {
  //       // simpan ke DB lewat API
  //       await axios.post(
  //         `${import.meta.env.VITE_APP_API_BASE_URL}/send-message`,
  //         {
  //           receiveId: ADMIN_ID,
  //           content: input,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       // kirim lewat socket
  //       socket.emit("sendMessage", {
  //         sendId: pengguna.id,
  //         receiveId: ADMIN_ID,
  //         content: input,
  //       });

  //       // ⚠️ Hapus setMessages manual biar tidak double
  //       console.log("handleSend jalan:", input);

  //       setInput("");
  //     } catch (err) {
  //       console.error("Gagal kirim pesan:", err);
  //     }
  //   };
  const handleSend = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      sendId: pengguna.id,
      receiveId: ADMIN_ID,
      content: input,
    });

    console.log("handleSend jalan:", input);
    setInput("");
  };

  useEffect(() => {
    if (!pengguna) return;
    axios
      .get(
        `${
          import.meta.env.VITE_APP_API_BASE_URL
        }/get-message?partnerId=${ADMIN_ID}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setMessages(res.data.data))
      .catch((err) => console.error(err));
  }, [pengguna]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const formatTime = (dateString) => {
    return dayjs(dateString).format("HH:mm, DD MMM");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        activeSidebar === "chat" ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Chat Kami</h2>
        <button onClick={closeSidebar}>
          <X />
        </button>
      </div>

      {/* CHAT LIST */}
      <div className="p-4 overflow-y-auto h-[calc(100%-120px)] space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[70%] ${
              m.sendId === pengguna.id
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-black"
            }`}
          >
            <div>{m.content}</div>
            <div className="text-xs opacity-70 mt-1 text-right">
              {formatTime(m.createdAt)}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* INPUT BOX */}
      <div className="p-2 border-t flex gap-1">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 border rounded-lg px-2 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-3 rounded-lg"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
