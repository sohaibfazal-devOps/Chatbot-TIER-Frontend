import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function MessageBubble({ role, content, source, isError }) {
  const formatMessage = (text) => {
    if (!text) return '';

    try {
      const lines = text.split('\n');
      const elements = [];

      lines.forEach((line, i) => {
        // Remove brackets around image tags
        const cleanedLine = line.replace(/\[(<img .*?>)\]/g, '$1');

        const parts = cleanedLine.split(/(<img .*?>)/g);

        parts.forEach((part, j) => {
          if (part.startsWith('<img')) {
            const imgMatch = part.match(/<img src="([^"]+)" alt="([^"]*)"\s*\/?>/);
            if (imgMatch) {
              elements.push(
                <div key={`${i}-${j}`} className="my-4">
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
          } else if (part) {
            // Process text part
            if (part.startsWith('#')) {
              const level = part.match(/^#+/)[0].length;
              const text = part.replace(/^#+\s*/, '');
              const Tag = `h${Math.min(level, 6)}`;
              elements.push(<Tag key={`${i}-${j}`} className="font-bold my-2">{text}</Tag>);
            } else if (part.match(/^\d+\.\s/)) {
              const textParts = part.split(/(\*\*.*?\*\*|\*.*?\*)/g);
              elements.push(
                <p key={`${i}-${j}`} className="mb-2 pl-4">
                  {textParts.map((p, k) => {
                    if (p.startsWith('**') && p.endsWith('**')) {
                      return <strong key={k}>{p.slice(2, -2)}</strong>;
                    }
                    if (p.startsWith('*') && p.endsWith('*')) {
                      return <strong key={k}>{p.slice(1, -1)}</strong>;
                    }
                    return p;
                  })}
                </p>
              );
            } else if (part.includes('**') || part.includes('*')) {
              const textParts = part.split(/(\*\*.*?\*\*|\*.*?\*)/g);
              elements.push(
                <p key={`${i}-${j}`} className="mb-2">
                  {textParts.map((p, k) => {
                    if (p.startsWith('**') && p.endsWith('**')) {
                      return <strong key={k}>{p.slice(2, -2)}</strong>;
                    }
                    if (p.startsWith('*') && p.endsWith('*')) {
                      return <strong key={k}>{p.slice(1, -1)}</strong>;
                    }
                    return p;
                  })}
                </p>
              );
            } else {
              elements.push(<p key={`${i}-${j}`} className="mb-2">{part}</p>);
            }
          }
        });
      });

      return elements;
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