import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = ({ mode, story = '' }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! Ask me anything.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const endpoint =
        mode === 'story'
          ? 'http://localhost:8000/chat/story'
          : 'http://localhost:8000/chat/ncert';

      const payload =
        mode === 'story'
          ? { question: input, story }
          : { question: input };

      const res = await axios.post(endpoint, payload);

      setMessages([
        ...newMessages,
        { sender: 'bot', text: res.data.answer || 'Sorry, no response.' },
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Error occurred. Please try again.' },
      ]);
    }

    setInput('');
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">
      <div className="max-h-60 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded ${
              msg.sender === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          className="flex-grow border p-2 rounded-l"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
