
import React from 'react';
import { MessageType } from '@/types/chatTypes';

interface ChatMessageProps {
  message: MessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom duration-300`}>
      <div className={`max-w-[80%] ${isBot ? 'order-2' : 'order-1'}`}>
        {isBot && (
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🤖</span>
            </div>
            <span className="text-xs text-gray-500">SwiggyBot</span>
          </div>
        )}
        <div
          className={`rounded-lg p-3 ${
            isBot
              ? 'bg-gray-100 text-gray-800'
              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
          } shadow-sm`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
          <div className={`text-xs mt-1 ${isBot ? 'text-gray-500' : 'text-orange-100'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};
