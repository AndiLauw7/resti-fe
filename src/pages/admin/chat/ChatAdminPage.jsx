import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import ChatAdmin from "./ChatAdmin";
import { io } from "socket.io-client";

const ChatAdminPage = () => {
  const { token, pengguna } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_BASE_URL}/get-chat-partners`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error(err));
  }, [token]);
  // ChatAdminPage.jsx
  useEffect(() => {
    if (!pengguna?.id) return;
    const s = io("http://localhost:5000", {
      auth: { token },
    });

    s.on("connect", () => {
      console.log("Socket connected:", s.id);
      s.emit("joinRoom", pengguna.id.toString()); // ✅ room id = userId
    });

    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, [token, pengguna?.id]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar User List */}
      <div className="w-64 border-r border-gray-300 bg-white shadow-md flex flex-col">
        <div className="p-2 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700">Daftar User</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-2 cursor-pointer transition-colors duration-200 
                ${
                  selectedUser?.id === user.id
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <div className="font-medium">{user.nama}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Box */}
      <div className="flex-1 flex flex-col">
        <div className="p-2 border-b border-gray-200 bg-white shadow-sm">
          {selectedUser ? (
            <h2 className="text-lg font-semibold text-gray-700">
              Chat dengan {selectedUser.nama}
            </h2>
          ) : (
            <h2 className="text-lg font-semibold text-gray-400">
              Pilih user untuk mulai chat
            </h2>
          )}
        </div>
        <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          {selectedUser ? (
            <ChatAdmin selectedUser={selectedUser} socket={socket} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Tidak ada chat yang dipilih
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatAdminPage;
