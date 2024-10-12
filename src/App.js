import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('https://portfolio-pcep.onrender.com/data/messages')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data follows the structure you've provided
        const sortedMessages = data.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setMessages(sortedMessages);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Messages</h1>
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="message-container">
              <h3>{message.name}</h3>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Message:</strong> {message.message}</p>
              <p className="createdAt"><strong>Created At:</strong> {new Date(message.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>Loading messages...</p>
        )}
      </div>
    </div>
  );
};

export default App;
