// import axios from "axios";
// import { useContext, useEffect, useRef, useState } from "react";
// import { AuthContext } from "../../../context/AuthContext";
// import dayjs from "dayjs";
// const ChatAdmin = ({ selectedUser }) => {
//   const { token, pengguna } = useContext(AuthContext); // pengguna.id = adminId
//   const [messages, setMessages] = useState([]);
//   const [newMsg, setNewMsg] = useState("");
//   const chatEndRef = useRef(null);
//   useEffect(() => {
//     if (selectedUser) {
//       axios
//         .get(
//           `${import.meta.env.VITE_APP_API_BASE_URL}/get-message?partnerId=${
//             selectedUser.id
//           }`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         )
//         .then((res) => setMessages(res.data.data))
//         .catch((err) => console.error(err));
//     }
//   }, [selectedUser, token]);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (!newMsg.trim()) return;

//     await axios.post(
//       `${import.meta.env.VITE_APP_API_BASE_URL}/send-message`,
//       {
//         receiveId: selectedUser.id,
//         content: newMsg,
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setNewMsg("");

//     // refresh pesan setelah kirim
//     const res = await axios.get(
//       `${import.meta.env.VITE_APP_API_BASE_URL}/get-message?partnerId=${
//         selectedUser.id
//       }`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     setMessages(res.data.data);
//   };
//   return (
//     // <div className="flex flex-col h-full">
//     //   <div className="flex-1 overflow-y-auto p-2 bg-gray-50 space-y-2">
//     //     {messages.map((msg, i) => {
//     //       const isAdmin = msg.sendId === pengguna.id;
//     //       return (
//     //         <div
//     //           key={i}
//     //           className={`flex flex-col max-w-xs md:max-w-md ${
//     //             isAdmin ? "ml-auto items-end" : "mr-auto items-start"
//     //           }`}
//     //         >
//     //           <div
//     //             className={`px-4 py-2 rounded-lg shadow-md ${
//     //               isAdmin ? "bg-blue-500 text-white" : "bg-white text-gray-800"
//     //             }`}
//     //           >
//     //             {msg.content}
//     //           </div>
//     //           <div className="text-xs text-gray-400 mt-1">
//     //             {dayjs(msg.createdAt).format("HH:mm, DD MMM")}
//     //           </div>
//     //         </div>
//     //       );
//     //     })}
//     //     <div ref={chatEndRef} />
//     //   </div>

//     //   {/* Input area */}
//     //   <div className="p-2 border-t border-gray-200 bg-white flex items-center space-x-2">
//     //     <input
//     //       value={newMsg}
//     //       onChange={(e) => setNewMsg(e.target.value)}
//     //       placeholder="Ketik pesan..."
//     //       className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//     //       onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//     //     />
//     //     <button
//     //       onClick={sendMessage}
//     //       className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md"
//     //     >
//     //       Kirim
//     //     </button>
//     //   </div>
//     // </div>
//     <div className="flex flex-col h-full">
//       {/* Area Pesan */}
//       <div className="flex-1 overflow-y-auto p-2 bg-gray-50 space-y-2">
//         {messages.map((msg, i) => {
//           const isAdmin = msg.sendId === pengguna.id;
//           return (
//             <div
//               key={i}
//               className={`flex flex-col max-w-xs md:max-w-md ${
//                 isAdmin ? "ml-auto items-end" : "mr-auto items-start"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-lg shadow-md ${
//                   isAdmin ? "bg-blue-500 text-white" : "bg-white text-gray-800"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//               <div className="text-xs text-gray-400 mt-1">
//                 {dayjs(msg.createdAt).format("HH:mm, DD MMM")}
//               </div>
//             </div>
//           );
//         })}
//         <div ref={chatEndRef} />
//       </div>

//       {/* Input */}
//       <div className="flex-none p-2 border-t border-gray-200 bg-white flex items-center space-x-2">
//         <input
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           placeholder="Ketik pesan..."
//           className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md"
//         >
//           Kirim
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatAdmin;
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import dayjs from "dayjs";

const ChatAdmin = ({ selectedUser, socket }) => {
  const { token, pengguna } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!socket) return;

    // listen pesan realtime
    socket.on("receiveMessage", (msg) => {
      console.log("Pesan diterima realtime:", msg);
      if (
        (msg.sendId === selectedUser.id && msg.receiveId === pengguna.id) ||
        (msg.sendId === pengguna.id && msg.receiveId === selectedUser.id)
      ) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, selectedUser, pengguna.id]);

  // load chat history saat ganti user
  useEffect(() => {
    if (selectedUser) {
      axios
        .get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/get-message?partnerId=${
            selectedUser.id
          }`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => setMessages(res.data.data))
        .catch((err) => console.error(err));
    }
  }, [selectedUser, token]);

  //   const sendMessage = () => {
  //     if (!newMsg.trim() || !socket) return;

  //     socket.emit("sendMessage", {
  //       sendId: pengguna.id.toString(), // harus string
  //       receiveId: selectedUser.id.toString(),
  //       content: newMsg,
  //     });

  //     setNewMsg("");
  //   };
  const sendMessage = () => {
    if (!newMsg.trim() || !socket) return;

    const msgData = {
      sendId: pengguna.id.toString(),
      receiveId: selectedUser.id.toString(),
      content: newMsg,
      createdAt: new Date().toISOString(), // kasih timestamp lokal
    };

    // kirim ke server
    socket.emit("sendMessage", msgData);

    // langsung update state biar muncul tanpa refresh
    setMessages((prev) => [...prev, msgData]);

    setNewMsg("");
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Area Pesan */}
      <div className="flex-1 overflow-y-auto p-2 bg-gray-50 space-y-2">
        {messages.map((msg, i) => {
          const isAdmin = msg.sendId.toString() === pengguna.id.toString();
          return (
            <div
              key={i}
              className={`flex flex-col max-w-xs md:max-w-md ${
                isAdmin ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg shadow-md ${
                  isAdmin ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                }`}
              >
                {msg.content}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {dayjs(msg.createdAt).format("HH:mm, DD MMM")}
              </div>
            </div>
          );
        })}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex-none p-2 border-t border-gray-200 bg-white flex items-center space-x-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatAdmin;
