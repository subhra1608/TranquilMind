import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../data/baseUrl';

// Helper function to format the timestamp
const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the format as needed
};

const QnAComponent = ({ item, navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Retrieve user ID from storage
        const getUserId = async () => {
            const userIdFromStorage = await AsyncStorage.getItem('userId');
            setUserId(userIdFromStorage);
        };
        getUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchQuestions();
        }
    }, [userId]);

    const fetchQuestions = async () => {
        setIsLoading(true);
        try {
            // Replace `baseUrl` with your actual backend API URL
            const response = await axios.get(`${baseUrl}/api/question/approved-questions`, {
                params: { userId: userId },
            });
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
            Alert.alert('Error', 'Could not fetch questions.');
        }
        setIsLoading(false);
    };

    const renderQuestionItem = ({ item }) => (
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            <Text style={styles.answerText}>{item.answer}</Text>
            <Text style={styles.askedBy}>Asked by: {item.askedBy}</Text>
            <Text style={styles.answeredBy}>Answered by: {item.answeredBy}</Text>
            <Text style={styles.timestamp}>Asked on: {formatDateTime(item.askedAt)}</Text>
            {item.answeredAt && (
                <Text style={styles.timestamp}>Answered on: {formatDateTime(item.answeredAt)}</Text>
            )}
        </View>
    );

    if (isLoading) {
        return <ActivityIndicator style={{ flex: 1 }} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={questions}
                keyExtractor={(item) => String(item.question_id)}
                renderItem={renderQuestionItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    questionContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    answerText: {
        fontSize: 16,
        color: 'green',
        marginBottom: 4,
    },
    askedBy: {
        fontSize: 14,
        color: '#888',
    },
    answeredBy: {
        fontSize: 14,
        color: '#888',
    },
    timestamp: {
        fontSize: 12,
        color: '#555',
    },
});

export default QnAComponent;

