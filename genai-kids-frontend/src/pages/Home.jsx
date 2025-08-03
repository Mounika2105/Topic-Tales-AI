import React, { useState } from "react";
import Tabs from "../components/tabs";
import GenerateStory from "../components/GenerateStory";
import Chatbot from "../components/Chatbot";
import UploadPdf from "../components/UploadPdf";
import NcertRagChat from "../components/NcertRagChat";

function Home() {
  const [activeTab, setActiveTab] = useState("story");
  const [generatedStory, setGeneratedStory] = useState(null); // store story content

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          📚 GenAI Kids Story & Learning Assistant
        </h1>

        {/* Tabs for Story and NCERT modes */}
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Conditional Rendering */}
        {activeTab === "story" && (
          <>
            <GenerateStory setGeneratedStory={setGeneratedStory} />
            {generatedStory && (
              <Chatbot storyContent={generatedStory.story} />
            )}
          </>
        )}

        {activeTab === "ncert" && (
          <>
            <UploadPdf />
            <NcertRagChat />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
