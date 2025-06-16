import React from 'react';

function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-gray-100 rounded-lg px-4 py-2">
        <div className="typing-indicator flex space-x-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator; 