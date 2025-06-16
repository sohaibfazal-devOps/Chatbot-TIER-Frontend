import React, { useRef, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import LoadingIndicator from '../components/LoadingIndicator';

function Chat() {
  const { messages, isLoading, error, sendMessage, addUserMessage } = useChat();
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

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white rounded-lg shadow-lg">
      {/* Messages Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ 
          maxHeight: 'calc(100vh - 8rem)',
          scrollBehavior: 'smooth'
        }}
      >
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