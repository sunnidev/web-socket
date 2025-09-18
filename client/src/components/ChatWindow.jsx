const ChatWindow = ({ activeChat, question, setQuestion, askQuestion }) => {

    return (
        <div className="col-span-4 flex flex-col h-screen">
            <div className="flex-1 p-5 overflow-y-auto space-y-3 scrollbar-thin">
                {activeChat ? (
                    activeChat.messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`p-3 rounded-lg whitespace-pre-wrap break-words
                ${msg.role === "user"
                                    ? "bg-blue-500 text-white self-end ml-auto w-fit max-w-full"
                                    : msg.role === "assistant"
                                        ? "bg-zinc-800 text-white self-start mr-auto w-fit max-w-full"
                                        : msg.role === "system"
                                            ? "text-gray-400 italic text-center w-full"
                                            : "bg-red-500 text-white w-fit max-w-full"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center mt-10">
                        ➕ Start a new chat to begin
                    </p>
                )}
            </div>

            {activeChat && (
                <div className="p-4 border-t border-zinc-700 flex bg-black">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && askQuestion()}
                        placeholder="Ask Gemini anything..."
                        className="flex-1 p-3 rounded-4xl bg-zinc-800 border border-zinc-700 outline-none"
                    />
                    <button
                        onClick={askQuestion}
                        className="ml-2 px-4 bg-blue-500 rounded-3xl hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
