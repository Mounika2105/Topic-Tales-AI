import React, { useState } from 'react';
import axios from 'axios';
import Chatbot from './Chatbot';

const StoryTab = () => {
  const [topic, setTopic] = useState('');
  const [age, setAge] = useState('');
  const [language, setLanguage] = useState('english');
  const [storyData, setStoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/generate', {
        topic,
        age,
        language
      });
      setStoryData(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to generate story.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">Generate a Story</h2>
        <input
          className="border rounded p-2 mr-2"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          className="border rounded p-2 mr-2"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="english">English</option>
          <option value="telugu">Telugu</option>
        </select>
        <button
          className="ml-3 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={generateStory}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {storyData && (
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
          <h3 className="text-lg font-semibold">📖 Story</h3>
          <p>{storyData.story}</p>

          <h3 className="text-lg font-semibold">🎤 Audio</h3>
          <audio controls src={`http://localhost:8000${storyData.audio_url}`} />

          <h3 className="text-lg font-semibold">❓ Quiz</h3>
          <ul className="list-disc list-inside">
            {storyData.quiz.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      {storyData && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">💬 Ask something about the story</h3>
          <Chatbot mode="story" story={storyData.story} />
        </div>
      )}
    </div>
  );
};

export default StoryTab;
