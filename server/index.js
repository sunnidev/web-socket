import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const port = 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = process.env.URL;

const wss = new WebSocketServer({ port }, () => {
  console.log(`✅ WebSocket running at ws://localhost:${port}`);
});

wss.on("connection", (ws) => {
  console.log("⚡ Client connected");

  ws.on("message", async (message) => {
    try {
      const { question } = JSON.parse(message.toString()); 
      console.log("📩 Question:", question);

      const payload = {
        contents: [
          {
            parts: [{ text: question }],
          },
        ],
      };

      let response = await fetch(`${GEMINI_URL}${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      response = await response.json();

      const answer =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No answer found"; // ✅ fixed optional chaining

      ws.send(JSON.stringify({ answer }));
    } catch (error) {
      console.error("❌ Error processing message:", error);
      ws.send(JSON.stringify({ error: "Something went wrong" }));
    }
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
});
