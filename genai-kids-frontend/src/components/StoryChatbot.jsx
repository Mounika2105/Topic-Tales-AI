// src/components/StoryChatbot.jsx

import React, { useState } from "react";
import axios from "axios";

const StoryChatbot = ({ storyContent }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:8000/story_chat", {
        question: input,
        story: storyContent.story, // full story text
      });

      const botMessage = { role: "assistant", content: response.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">
        🤖 Story Chatbot (Ask doubts or give feedback)
      </h2>

      <div className="bg-gray-100 p-4 rounded-md max-h-60 overflow-y-auto mb-3">
        {messages.length === 0 && <p className="text-gray-500">Start by asking a question...</p>}
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user" ? "bg-indigo-200" : "bg-green-200"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-md"
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default StoryChatbot;
