import React, { useState, useContext } from 'react';
import { ChatContext } from '../context/ChatContext';

const UserInput = () => {
  const [input, setInput] = useState('');
  const { sendMessage, loading } = useContext(ChatContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="user-input">
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something..." />
      <button type="submit" disabled={loading}>Send</button>
    </form>
  );
};

export default UserInput;
