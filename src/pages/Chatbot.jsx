import { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message immediately
    const userMessage = { text: input, isUser: true, type: 'text' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chatbot/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const { results } = await response.json();
      
      // Remove any existing loading indicator and add new results
      setMessages(prev => [
        ...prev.filter(msg => msg.type !== 'loading'),
        {
          text: results.length > 0 
            ? "Here's what I found:" 
            : "I couldn't find relevant information.",
          isUser: false,
          type: 'text'
        },
        ...results.map(result => ({
          text: result.text,
          source: result.source,
          section: result.section,
          isUser: false,
          type: 'result'
        }))
      ]);
    } catch (error) {
      // Remove loading indicator and show error
      setMessages(prev => [
        ...prev.filter(msg => msg.type !== 'loading'),
        {
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false,
          type: 'error'
        }
      ]);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Add loading message to display when waiting for response
  useEffect(() => {
    if (isLoading) {
      const loadingMessage = {
        text: '',
        isUser: false,
        type: 'loading'
      };
      setMessages(prev => [...prev, loadingMessage]);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">FlavorScape Chat</h1>
        <p className="text-sm text-blue-100">Ask about food flavors, ingredients, or recipes</p>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <h3 className="text-lg font-medium mb-2">Welcome to FlavorScape Chat</h3>
            <p>Start by asking about food information</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex mb-4 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'loading' ? (
                <div className="bg-white text-gray-800 rounded-lg rounded-bl-none px-4 py-2 border border-gray-200 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              ) : (
                <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.isUser 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : msg.type === 'error'
                      ? 'bg-red-100 text-red-800 border-l-4 border-red-500'
                      : msg.type === 'result'
                        ? 'bg-blue-50 text-gray-800 border-l-4 border-blue-500'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}>
                  <p>{msg.text}</p>
                  {msg.type === 'result' && (
                    <div className="mt-2 text-xs text-gray-500">
                      <p className="font-semibold">Source: {msg.source}</p>
                      {msg.section && <p>Section: {msg.section}</p>}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about food flavors..."
            disabled={isLoading}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="2"
          />
          <button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            className={`px-4 py-2 rounded-lg font-medium ${
              !input.trim() || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}