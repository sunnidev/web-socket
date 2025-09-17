import React, { useEffect, useRef, useState } from 'react'
const WS_URL = "ws://localhost:5000"


const NodeWebSocket = () => {

    const [question, setQuestion] = useState("")
    const [result, setResult] = useState("");
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = () => {
            console.log("Connected to WebSocket server");
        }
        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.answer) {
                setResult(data.answer);
            } if (data.error) {
                setResult("❌ " + data.error);
            }
        }
        ws.current.onclose = () => {
            console.log("Disconnected from WebSocket server");
        }
        return () => ws.current.close();
    }, []);
    const askQuestion = () => {
        if (question.trim()) {
            ws.current.send(JSON.stringify({ question }));
            setQuestion("")
        }

    };

    return (
        <div className="grid grid-cols-5 h-screen bg-black text-center">
            <div className="col-span-1 bg-zinc-800">
            </div>
            <div className="col-span-4 p-10">
                <div className="container h-110 text-white overflow-hidden overflow-y-auto mb-5 p-5 border border-zinc-700 rounded-4xl">
                    {result}
                </div>
                <div className="bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16">
                    <input
                        value={question}
                        type="text"
                        onChange={(event) => setQuestion(event.target.value)}
                        className="w-full h-full p-3 outline-none"
                        placeholder="Ask anything"
                        onKeyDown={(e) => e.key === "Enter" && askQuestion()}
                    />
                    <button onClick={askQuestion}>Ask</button>
                </div>
            </div>
        </div>
    )
}

export default NodeWebSocket
