import React, { useState } from 'react';

const users = {
  'ammar.aslam@mammoth-ai.com': 'M@mmoth123!',
};

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users[email] === password) {
      sessionStorage.setItem('auth_user', email);
      onLogin(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-xl shadow-lg overflow-hidden">
      

        <div className="bg-gray-100 flex flex-col justify-center items-start p-10 pr-6">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Treaty Assistant</h1>
          <p className="text-lg text-black">
            Login to inquire about the treaty submissions and claims processing.
          </p>
        </div>

 
        <div className="bg-white p-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
