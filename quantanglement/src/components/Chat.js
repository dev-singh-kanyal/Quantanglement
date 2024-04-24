import React, { useState, useEffect } from 'react';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Simulated initial messages (to replace with actual data)
        const initialMessages = [
            { id: 1, text: 'Hello, everyone!' },
            { id: 2, text: 'Welcome to the group chat.' },
        ];
        setMessages(initialMessages);

        // Replace with actual fetch logic to get messages from an API or WebSocket
        // fetchMessagesFromServer().then(data => setMessages(data));
    }, []);

    const handleSendMessage = () => {
        // Simulated sending message (replace with actual logic)
        const updatedMessages = [...messages, { id: Date.now(), text: newMessage }];
        setMessages(updatedMessages);
        setNewMessage('');
    };

    return (
        <div className="group-chat">
            <h2>Group Chat</h2>
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className="message">
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
