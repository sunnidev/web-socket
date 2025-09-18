import React, { useState } from "react";
import { RiChatNewLine } from "react-icons/ri";

const Sidebar = ({ chats, activeChat, setActiveChat, createNewChat }) => {
  const [isNaming, setIsNaming] = useState(false);
  const [chatName, setChatName] = useState("");

  const handleCreateChat = () => {
    if (chatName.trim() === "") return;
    createNewChat(chatName);
    setChatName("");
    setIsNaming(false);
  };

  return (
    <div className="col-span-1 bg-zinc-900 flex flex-col h-screen">
      <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
        <h1 className="font-bold text-lg">💬 Gemini Chat</h1>
        <button
          onClick={() => setIsNaming(true)}
          className="px-3 py-1 rounded hover:bg-zinc-800"
        >
          <RiChatNewLine size={20} />
        </button>
      </div>

      {isNaming && (
        <div className="p-2 border-b border-zinc-700">
          <input
            type="text"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateChat()}
            placeholder="Enter chat name..."
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white outline-none"
            autoFocus
          />
          <button
            onClick={handleCreateChat}
            className="mt-2 w-full bg-blue-500 py-2 rounded hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overscroll-contain">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className={`p-3 cursor-pointer truncate ${
              activeChat?.id === chat.id
                ? "bg-blue-600 text-white"
                : "hover:bg-zinc-800"
            }`}
          >
            <p className="font-medium">{chat.name}</p>
            <p className="text-xs text-gray-400">
              {chat.messages[chat.messages.length - 1]?.text.slice(0, 25) ||
                "No messages"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
