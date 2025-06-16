import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

function Layout({ children }) {
  const location = useLocation();

  const navigation = [
    { name: 'Chat', href: '/', icon: ChatBubbleLeftRightIcon },
    { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">Treaty Assistant</h1>
              </div>
              <nav className="ml-6 flex space-x-8">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                        isActive
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto pt-20 pb-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

export default Layout; 