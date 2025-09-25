import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

function Help() {
  const examples = [
    "How do I submit a treaty by copying an existing one?",
    "What are the steps to create a new submission?",
    "How do I renew an expired treaty?",
    "What happens when I click the Save button?",
  ];

  const tips = [
    "Be specific about what you want to do",
    "Mention if you're looking for step-by-step instructions",
    "Ask about specific buttons, menus, or features",
    "I can explain figure references and screenshots",
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">How to Get the Best Answers</h1>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Good Questions Examples</h2>
          <ul className="space-y-2">
            {examples.map((example, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">{example}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Results</h2>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
            Start Chatting
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Help; 