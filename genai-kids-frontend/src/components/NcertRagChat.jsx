import { useState } from "react";
import axios from "axios";

export default function NcertRagChat() {
  const [query, setQuery] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = async () => {
    if (!pdfFile) return alert("Please select a PDF file to upload.");

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      await axios.post("http://localhost:8000/upload-pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploaded(true);
      alert("📘 PDF uploaded successfully! You can now ask questions.");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed.");
    }
  };

  const sendQuery = async () => {
    if (!query.trim()) return;

    setLoading(true);
    const userMsg = { sender: "user", text: query };
    setChatLog((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:8000/ncert-chat", {
        question: query,
      });

      const botMsg = { sender: "bot", text: res.data.answer };
      setChatLog((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { sender: "bot", text: "Sorry, something went wrong." };
      setChatLog((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-3">📚 NCERT RAG Chat</h2>

      {/* Upload PDF */}
      <div className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
        >
          Upload NCERT PDF
        </button>
      </div>

      {/* Chat Area */}
      <div className="h-64 overflow-y-auto bg-gray-100 rounded-md p-3 mb-3">
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left text-blue-800"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.sender === "user" ? "bg-green-200" : "bg-blue-100"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your doubt..."
          disabled={!uploaded}
          className="flex-1 px-4 py-2 rounded-md border"
        />
        <button
          onClick={sendQuery}
          disabled={loading || !uploaded}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
