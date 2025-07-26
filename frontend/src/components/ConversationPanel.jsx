import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ChatContext } from '../context/ChatContext';

const ConversationPanel = () => {
  const { setSessionId, sessionId, setMessages } = useContext(ChatContext);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SESSION_ENDPOINT}`)
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const loadSession = (id) => {
    setSessionId(id);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_SESSION_ENDPOINT}${id}/`)
      .then((res) => setMessages(res.data.messages))
      .catch((err) => console.error(err));
  };

  return (
    <div className="conversation-panel">
      <h4>Past Sessions</h4>
      {sessions.map((s) => (
        <div key={s.id} onClick={() => loadSession(s.id)}>
          Session {s.id}
        </div>
      ))}
    </div>
  );
};

export default ConversationPanel;
