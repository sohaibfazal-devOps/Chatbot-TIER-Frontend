import React, { useState, useEffect } from 'react';

function LoadingIndicator() {
  const [currentStage, setCurrentStage] = useState(0);
  
  const stages = [
    { message: "Analyzing query", delay: 0 },
    { message: "Checking intent", delay: 3000 }, // 3 seconds
    { message: "Fetching database", delay: 9000 }, // 9 seconds
  ];

  useEffect(() => {
    const timers = stages.map((stage, index) => {
      if (index === 0) return null; // Skip first stage as it's shown immediately
      
      return setTimeout(() => {
        setCurrentStage(index);
      }, stage.delay);
    });

    return () => {
      timers.forEach(timer => timer && clearTimeout(timer));
    };
  }, []);

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-gray-100 rounded-lg px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="typing-indicator flex space-x-1">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
          </div>
          <span className="text-gray-600 text-sm font-medium">
            {stages[currentStage].message}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator; 


