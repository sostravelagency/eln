
import React, { useState } from 'react';
import axios from 'axios';
import './AskQuestion.css';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const ChatUI: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentConversation, setCurrentConversation] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setIsLoading(true);
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');

            try {
                const response=     await axios.post('https://api-chat-with-langchain-by-fastapi.onrender.com/ask', { question: inputValue });
                const botResponse = response.data.response;
                setMessages([...messages, { text: inputValue, sender: 'user' }, { text: botResponse, sender: 'bot' }]);
            } catch (error) {
                console.error('Error calling ChatBot API:', error);
                setMessages([...messages, { text: 'Đã xảy ra lỗi khi gọi API ChatBot', sender: 'bot' }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleNewConversation = () => {
        setMessages([]);
        setCurrentConversation(currentConversation + 1);
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button onClick={handleNewConversation}>Tạo cuộc trò chuyện mới</button>
                <span>Cuộc trò chuyện số: {currentConversation}</span>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
                {isLoading && <div className="loading">Đang tải...</div>}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Nhập tin nhắn..."
                />
                <button onClick={handleSendMessage} disabled={isLoading}>
                    {isLoading ? 'Đang tải...' : 'Gửi'}
                </button>
            </div>
        </div>
    );
};

export default ChatUI;