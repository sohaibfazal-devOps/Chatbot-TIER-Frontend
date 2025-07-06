import React, { useRef, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import LoadingIndicator from '../components/LoadingIndicator';

function Chat() {
  const { messages, isLoading, error, sendMessage, addUserMessage, activeExpert, setActiveExpert } = useChat();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (message) => {
    if (!message.trim() || isLoading) return;
    
    addUserMessage(message);
    await sendMessage(message);
  };

  const handleTabChange = (expert) => {
    setActiveExpert(expert);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-white rounded-lg shadow-lg">
      {/* Expert Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => handleTabChange('treaty')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeExpert === 'treaty'
              ? 'bg-white text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          Treaty Submission Expert
        </button>
        <button
          onClick={() => handleTabChange('claims')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
            activeExpert === 'claims'
              ? 'bg-white text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          Claims Expert
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ 
          maxHeight: 'calc(100vh - 10rem)',
          scrollBehavior: 'smooth'
        }}
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg font-medium mb-2">
              {activeExpert === 'treaty' ? 'Treaty Submission Expert' : 'Claims Expert'}
            </p>
            <p className="text-sm">
              {activeExpert === 'treaty' 
                ? 'Ask me anything about treaty submissions and related processes.'
                : 'Ask me anything about claims processing and related procedures.'
              }
            </p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            role={message.role}
            content={message.content}
            source={message.source}
            isError={message.isError}
          />
        ))}
        {isLoading && <LoadingIndicator />}
        {error && (
          <MessageBubble
            role="assistant"
            content={error}
            isError={true}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <ChatInput onSubmit={handleSubmit} disabled={isLoading} />
      </div>
    </div>
  );
}

export default Chat; 