import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const AskAI = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentConversation, setCurrentConversation] = useState(0);

    const handleInputChange = (text) => {
        setInputValue(text);
    };

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setIsLoading(true);
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');

            try {
                const response = await axios.post('https://api-chat-with-langchain-by-fastapi.onrender.com/ask', { question: inputValue });
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
        <View style={styles.chatContainer}>
            <View style={styles.chatHeader}>
                <Button title="create new coversation" onPress={handleNewConversation} />
                <Text>Number Chat: {currentConversation}</Text>
            </View>
            <ScrollView style={styles.chatMessages}>
                {messages.map((message, index) => (
                    <View key={index} style={[styles.message, message.sender === 'user' ? styles.user : styles.bot]}>
                        <Text>{message.text}</Text>
                    </View>
                ))}
                {isLoading && <Text style={styles.loading}>Loading...</Text>}
            </ScrollView>
            <View style={styles.chatInput}>
                <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={handleInputChange}
                    placeholder="Input messenge.."
                />
                <Button
                    title={isLoading ? 'Loading...' : 'Send'}
                    onPress={handleSendMessage}
                    disabled={isLoading}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "white"
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    chatMessages: {
        flex: 1,
        padding: 10,
    },
    message: {
        maxWidth: '70%',
        padding: 8,
        marginBottom: 10,
        borderRadius: 15,
        alignSelf: 'flex-end',
    },
    user: {
        backgroundColor: '#0084ff',
        color: '#fff',
    },
    bot: {
        backgroundColor: '#e6e6e6',
        color: '#333',
        alignSelf: 'flex-start',
    },
    loading: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#666',
    },
    chatInput: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
        padding: 8,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ccc',
    },
});

export default AskAI;
