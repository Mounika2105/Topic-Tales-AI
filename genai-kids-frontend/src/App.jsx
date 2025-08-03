import React from "react";
import TabContainer from "./components/TabContainer";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          📚 GenAI Storytelling Assistant
        </h1>
        <TabContainer />
      </div>
    </div>
  );
};

export default App;
