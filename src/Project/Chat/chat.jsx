import React, { useState, useEffect } from 'react';
import styles from './chatstyle';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const loggedInUsers = JSON.parse(localStorage.getItem('LoggedInfo'));

    useEffect(() => {
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    const getCurrentDateTime = () => {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const handleSendMessage = () => {
        if (input.trim() === '') {
            alert("Please enter a message before sending.");
            return;
        }

        const newMessage = {
            id: Number(new Date()),
            text: input,
            username: loggedInUsers.username,
            timestamp: getCurrentDateTime()
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
        setInput('');
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const refreshChatlist = (e) => {
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    };

    return (
        <div className='container'>
            <div className='main-div'>
                <h1>Chat Lists</h1>
                <div style={styles.chatBoxContainer}>
                    <div style={styles.chatWindow}>
                        {messages.map((message, index) => (
                            <div key={index} style={styles.messages}>
                                <div style={styles.textLeft}><b>{message.username}</b><br />
                                    <span>{message.text}</span>
                                </div>
                                <div style={styles.textRight}>{message.timestamp}</div>
                            </div>
                        ))}
                    </div>

                    <label style={styles.userLabel}> User : {loggedInUsers.username}</label>
                    <div style={styles.inputContainer}>

                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                            style={styles.inputField}
                        />
                        <button onClick={handleSendMessage} style={styles.sendButton}>
                            Send
                        </button>
                        <button onClick={refreshChatlist} style={styles.sendButton}>
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
