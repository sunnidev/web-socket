import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

const WS_URL = "ws://localhost:5000";

const NodeWebSocket = () => {
    const [question, setQuestion] = useState("");
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(WS_URL);

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);            
            setChats((prevChats) =>
                prevChats.map((chat) => {
                    if (chat.id === activeChat?.id) {
                        const updatedChat = {
                            ...chat,
                            messages: [
                                ...chat.messages,
                                {
                                    role: data.answer ? "assistant" : "error",
                                    text: data.answer || "❌ " + data.error,
                                },
                            ],
                        };
                        setActiveChat(updatedChat);
                        return updatedChat;
                    }
                    return chat;
                })
            );
        };

        return () => ws.current.close();
    }, [activeChat?.id]);

    //   const createNewChat = () => {
    //     const newChat = {
    //       id: Date.now(),
    //       name: `Chat ${chats.length + 1}`,
    //       messages: [{ role: "system", text: "New conversation started 🚀" }],
    //     };
    //     setChats((prev) => [...prev, newChat]);
    //     setActiveChat(newChat);
    //   };

    const createNewChat = (userName) => {
  const newChat = {
    id: Date.now(),
    name: userName,
    messages: [
      {
        role: "system",
        text: `👋 Hello ${userName}, how are you today?`,
      },
    ],
  };

  setChats((prev) => [...prev, newChat]);
  setActiveChat(newChat);
};

    const askQuestion = () => {
        if (question.trim() && activeChat) {
            const newMessage = { role: "user", text: question };
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === activeChat.id
                        ? { ...chat, messages: [...chat.messages, newMessage] }
                        : chat
                )
            );
            setActiveChat((prev) => ({
                ...prev,
                messages: [...prev.messages, newMessage],
            }));
            ws.current.send(JSON.stringify({ question }));
            setQuestion("");
        }
    };

    return (
        <div className="grid grid-cols-5 h-screen bg-black text-white overflow-hidden">
            <Sidebar
                chats={chats}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
                createNewChat={createNewChat}
            />
            <ChatWindow
                activeChat={activeChat}
                question={question}
                setQuestion={setQuestion}
                askQuestion={askQuestion}
            />
        </div>
    );
};

export default NodeWebSocket;
