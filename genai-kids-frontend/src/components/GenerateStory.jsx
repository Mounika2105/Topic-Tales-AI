import React, { useState } from "react";
import axios from "axios";

const GenerateStory = ({ setGenerated, setStoryContent }) => {
  const [topic, setTopic] = useState("");
  const [age, setAge] = useState("");
  const [language, setLanguage] = useState("English");
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic || !age || !language) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/generate", {
        topic,
        age,
        language,
      });

      setStoryData(response.data);
      setGenerated(true);
      setStoryContent(response.data);
    } catch (err) {
      console.error("Error generating story:", err);
      alert("Error generating story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">🧒 Story Generator</h2>
      
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
          <input
            type="text"
            placeholder="Enter topic (e.g. Trees, Honesty)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            placeholder="Age (e.g. 7)"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Telugu</option>
            <option>Tamil</option>
          </select>
        </div>
        <button
          onClick={handleGenerate}
          className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Story"}
        </button>
      </div>

      {storyData && (
        <div className="mt-8 bg-indigo-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-2 text-indigo-700">Story:</h2>
          <p className="mb-4 whitespace-pre-line">{storyData.story}</p>
          <h2 className="text-xl font-semibold mb-2 text-indigo-700">Quiz:</h2>
          <ul className="list-disc list-inside">
            {storyData.quiz.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
          <div className="mt-4">
            <audio controls className="w-full">
              <source src={`http://localhost:8000${storyData.audio_url}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateStory;
