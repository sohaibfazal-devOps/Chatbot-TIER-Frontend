import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function MessageBubble({ role, content, source, isError }) {
  const formatMessage = (content) => {
    if (!content) return '';
    
    try {
      return content.split('\n').map((line, i) => {
        // Check if line contains an image
        const imgMatch = line.match(/<img src="([^"]+)" alt="([^"]*)"\s*\/?>/);
        if (imgMatch) {
          return (
            <div key={i} className="my-4">
              <img
                src={imgMatch[1]}
                alt={imgMatch[2]}
                className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                style={{ 
                  maxHeight: '300px',
                  maxWidth: '400px',
                  opacity: '0.8',
                  transition: 'opacity 0.3s ease'
                }}
                onError={(e) => {
                  console.error('Image failed to load:', imgMatch[1]);
                  e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                }}
                onLoad={(e) => {
                  e.target.style.opacity = '1';
                }}
              />
            </div>
          );
        }
        
        // Check if line is a heading
        if (line.startsWith('#')) {
          const level = line.match(/^#+/)[0].length;
          const text = line.replace(/^#+\s*/, '');
          const Tag = `h${Math.min(level, 6)}`;
          return <Tag key={i} className="font-bold my-2">{text}</Tag>;
        }
        
        // Check if line is a list item
        if (line.match(/^\d+\.\s/)) {
          // Process bold text within list items
          const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
          return (
            <p key={i} className="mb-2 pl-4">
              {parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={j}>{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                  return <strong key={j}>{part.slice(1, -1)}</strong>;
                }
                return part;
              })}
            </p>
          );
        }

        // Check if line contains bold text (text between ** or *)
        if (line.includes('**') || line.includes('*')) {
          const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
          return (
            <p key={i} className="mb-2">
              {parts.map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={j}>{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                  return <strong key={j}>{part.slice(1, -1)}</strong>;
                }
                return part;
              })}
            </p>
          );
        }
        
        // Regular text line
        return <p key={i} className="mb-2">{line}</p>;
      });
    } catch (error) {
      console.error('Error formatting message:', error);
      return <p className="text-red-500">Error formatting message. Please try again.</p>;
    }
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-2 ${
          role === 'user'
            ? 'bg-blue-600 text-white'
            : isError
            ? 'bg-red-100 text-red-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {formatMessage(content)}
        {source && (
          <div className="mt-2 text-xs text-gray-500">
            <details>
              <summary className="cursor-pointer hover:text-gray-700 flex items-center">
                <span>View Source</span>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </summary>
              <div className="mt-2 p-2 bg-gray-50 rounded">
                {formatMessage(source)}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble; 