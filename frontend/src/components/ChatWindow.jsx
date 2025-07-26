import React, { useContext } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import ConversationPanel from './ConversationPanel';
import { ChatContext } from '../context/ChatContext';

const ChatWindow = () => {
  const { messages } = useContext(ChatContext);

  return (
    <div className="chat-window">
      <ConversationPanel />
      <div className="chat-area">
        <MessageList messages={messages} />
        <UserInput />
      </div>
    </div>
  );
};

export default ChatWindow;
