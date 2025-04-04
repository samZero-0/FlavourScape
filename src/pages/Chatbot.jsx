
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const response = await fetch('/api/chatbot/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input })
    });
    const results = await response.json();
    setMessages([...messages, { text: input, isUser: true }, ...results]);
    setInput('');
  };

  return (
    <div className="chat-container">
      {/* Message history */}
      {messages.map((msg, i) => (
        <div key={i} className={msg.isUser ? 'user-message' : 'bot-message'}>
          {msg.text}
        </div>
      ))}
      {/* Input box */}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}