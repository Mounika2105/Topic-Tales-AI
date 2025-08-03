// src/components/RAGChatbot.jsx

import React, { useState } from "react";
import axios from "axios";

const RAGChatbot = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ragEnabled, setRagEnabled] = useState(false);

  const handleUpload = async () => {
    if (!pdfFile) return;

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const res = await axios.post("http://localhost:8000/upload_ncert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        setRagEnabled(true);
        alert("PDF uploaded successfully. You can now ask questions!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading PDF.");
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/rag_query", {
        query: input,
      });

      const botMessage = { role: "assistant", content: res.data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("RAG error:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">📘 NCERT RAG Chatbot</h2>

      <div className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Upload NCERT Book
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-md max-h-60 overflow-y-auto mb-3">
        {messages.length === 0 && <p className="text-gray-500">Upload a PDF, then ask a question...</p>}
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
          placeholder="Ask a question from uploaded PDF..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-md"
          disabled={!ragEnabled}
        />
        <button
          onClick={handleSend}
          className={`${
            ragEnabled ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
          } text-white px-4 py-2 rounded-md transition`}
          disabled={!ragEnabled}
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default RAGChatbot;
