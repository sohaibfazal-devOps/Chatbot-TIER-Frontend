import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext';
import Layout from './components/Layout';
import Chat from './pages/Chat';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import LoginPage from './auth/LoginPage';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('auth_user');
    if (user) setAuthenticated(true);
  }, []);

  if (!authenticated) {
    return <LoginPage onLogin={setAuthenticated} />;
  }

  return (
    <ChatProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ChatProvider>
  );
}

export default App;