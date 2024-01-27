"use client"
import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sender, setSender] = useState('You'); // Jūs pradėsite kaip "You"

  useEffect(() => {
    // Automatiškai slinkti į žinučių apačią, kai pridedama nauja žinutė
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender, text: newMessage }]);
      setNewMessage('');
      // Pakeisti siuntėją į "Bot" po kiekvienos jūsų žinutės
      setSender(sender === 'You' ? 'Bot' : 'You');
    }
  };

  return (
    <div id="chatContainer" className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender.toLowerCase()}`}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Įveskite žinutę..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Siųsti</button>
      </div>
    </div>
  );
};

export default Chat;
