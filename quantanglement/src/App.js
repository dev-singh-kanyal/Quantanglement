import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;
