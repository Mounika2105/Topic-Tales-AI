// src/components/TabContainer.jsx

import React, { useState } from "react";
import GenerateStory from "./GenerateStory";
import StoryChatbot from "./StoryChatbot";
import NcertRagChat from "./NcertRagChat";

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState("story");
  const [generated, setGenerated] = useState(false);
  const [storyContent, setStoryContent] = useState(null);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex space-x-4 justify-center mb-6 max-w-md mx-auto">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "story"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("story")}
        >
          🧒 Story Generator
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            activeTab === "ncert"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setActiveTab("ncert")}
        >
          📘 NCERT RAG Chatbot
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "story" && (
        <>
          <GenerateStory
            setGenerated={setGenerated}
            setStoryContent={setStoryContent}
          />
          {generated && storyContent && (
            <StoryChatbot story={storyContent.story} />
          )}
        </>
      )}

      {activeTab === "ncert" && <NcertRagChat />}
    </div>
  );
};

export default TabContainer;
