
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/components/ChatMessage';
import { QuickActions } from '@/components/QuickActions';
import { ChatInput } from '@/components/ChatInput';
import { processMessage } from '@/utils/chatbotLogic';
import { MessageType } from '@/types/chatTypes';
import { Phone, Mail } from 'lucide-react';

const Index = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      text: "Hi! I'm SwiggyBot 🤖 Welcome to Swiggy <> Tezz Customer Support! How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [userRole, setUserRole] = useState<'customer' | 'internal'>('customer');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse = processMessage(text, userRole);
    const botMessage: MessageType = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Team Name */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-sm font-medium text-gray-600">Team Bighnesh</p>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🛵</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Swiggy <> Tezz</h1>
              <p className="text-orange-100 text-sm">Customer Support</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone size={16} />
              <span>1800-123-SWIGGY</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail size={16} />
              <span>support@swiggy.com</span>
            </div>
            <button
              onClick={() => setUserRole(userRole === 'customer' ? 'internal' : 'customer')}
              className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
            >
              {userRole === 'customer' ? '👤 Customer' : '👔 Internal'}
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-120px)] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden mb-4">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick Actions */}
            <QuickActions onQuickAction={handleQuickAction} userRole={userRole} />
            
            {/* Chat Input */}
            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
