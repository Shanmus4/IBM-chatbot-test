import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { getGeminiResponse, loadAboutMeContent } from './geminiService';

function renderInlineMarkdown(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function renderMessageContent(text) {
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${listKey}`} className="message-list">
          {listItems}
        </ul>
      );
      listItems = [];
      listKey += 1;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const bulletMatch = trimmedLine.match(/^[-*]\s+(.*)$/);

    if (bulletMatch) {
      listItems.push(
        <li key={`item-${index}`}>{renderInlineMarkdown(bulletMatch[1])}</li>
      );
      return;
    }

    flushList();

    if (trimmedLine === '') {
      elements.push(<br key={`br-${index}`} />);
      return;
    }

    elements.push(
      <React.Fragment key={`line-${index}`}>
        {renderInlineMarkdown(line)}
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });

  flushList();

  return elements;
}

// Figma assets
const imgUserImage = "/user-image.png"; // Will be added to public folder
const imgSendHorizontal = "/send-icon.svg"; // Will be added to public folder

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Hey there! I\'m Shanmu - well, a digital version of me powered by some cool AI magic! ⚡\n\nFeel free to ask me anything about my work, skills, projects, or whatever you\'re curious about! I\'m an open book... well, mostly! 😄\n\nI won\'t share super personal details (like my Aadhaar number 🙈), but I\'m happy to chat about pretty much everything else!\n\nSo... what\'s on your mind? Fire away! 🚀',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aboutMeContent, setAboutMeContent] = useState('');
  const messagesEndRef = useRef(null);

  // Load aboutme.md content on mount
  useEffect(() => {
    loadAboutMeContent().then(content => {
      setAboutMeContent(content);
    });
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const userMessageText = inputMessage;
      const userMessage = {
        id: messages.length + 1,
        type: 'user',
        text: userMessageText,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      
      // Add user message
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsLoading(true);

      try {
        // Get AI response
        const aiResponse = await getGeminiResponse(userMessageText, aboutMeContent);
        
        // Add bot response
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          text: aiResponse,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        const errorMessage = {
          id: messages.length + 2,
          type: 'bot',
          text: 'Sorry, I encountered an error. Please try again.',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <div className="user-image">
            <img src={imgUserImage} alt="User" />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-content">
        {/* Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message-container ${message.type}`}>
              <div className={`message-bubble ${message.type}`}>
                <div className="message-text">
                  {renderMessageContent(message.text)}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="message-container bot">
              <div className="message-bubble bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Got anything you want to know about me?"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            className="send-btn" 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputMessage.trim()}
          >
            <img src={imgSendHorizontal} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

// Made with Bob
