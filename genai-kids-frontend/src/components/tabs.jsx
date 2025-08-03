import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full">
      <div className="flex border-b mb-4">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 font-semibold ${i === active ? 'border-b-4 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  );
};

export default Tabs;
