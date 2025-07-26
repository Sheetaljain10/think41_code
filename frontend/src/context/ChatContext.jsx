import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const sendMessage = async (text) => {
    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat/', {
        message: text,
        conversation_id: sessionId,
      });
      const aiMsg = {
        sender: 'ai',
        text: response.data.response,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setSessionId(response.data.conversation_id);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, loading, sessionId }}>
      {children}
    </ChatContext.Provider>
  );
};
