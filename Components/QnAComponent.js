// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { baseUrl } from '../data/baseUrl';

// // Helper function to format the timestamp
// const formatDateTime = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString(); // Adjust the format as needed
// };

// const QnAComponent = ({ navigation }) => {
//     const [questions, setQuestions] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [userId, setUserId] = useState(null);

//     useEffect(() => {
//         // Retrieve user ID from storage
//         const getUserId = async () => {
//             const userIdFromStorage = await AsyncStorage.getItem('userId');
//             setUserId(userIdFromStorage);
//         };
//         getUserId();
//     }, []);

//     useEffect(() => {
//         if (userId) {
//             fetchQuestions();
//         }
//     }, [userId]);

//     const fetchQuestions = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axios.get(`${baseUrl}/api/question/approved-questions`, {
//                 params: { userId: userId },
//             });
//             setQuestions(response.data);
//         } catch (error) {
//             console.error('Error fetching questions:', error);
//             Alert.alert('Error', 'Could not fetch questions.');
//         }
//         setIsLoading(false);
//     };

//     const renderQuestionItem = ({ item }) => (
//         <View style={styles.questionContainer}>
//             <Text style={styles.questionHeader}>Question:</Text>
//             <Text style={styles.questionText}>{item.question}</Text>
//             <Text style={styles.answerHeader}>Answer:</Text>
//             <Text style={styles.answerText}>{item.answer}</Text>
//             <Text style={styles.metadata}>
//                 Asked by: {item.askedBy} on {formatDateTime(item.askedAt)}
//             </Text>
//             {item.answeredAt && (
//                 <Text style={styles.metadata}>
//                     Answered by: {item.answeredBy} on {formatDateTime(item.answeredAt)}
//                 </Text>
//             )}
//         </View>
//     );

//     if (isLoading) {
//         return <ActivityIndicator style={{ flex: 1 }} />;
//     }

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={questions}
//                 keyExtractor={(item) => String(item.question_id)}
//                 renderItem={renderQuestionItem}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     questionContainer: {
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         padding: 16,
//         marginBottom: 16,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.5,
//         elevation: 5,
//     },
//     questionHeader: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 4,
//         color: '#333',
//     },
//     questionText: {
//         fontSize: 16,
//         marginBottom: 8,
//         color: '#444',
//     },
//     answerHeader: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 4,
//         color: '#333',
//     },
//     answerText: {
//         fontSize: 16,
//         color: 'green',
//         marginBottom: 8,
//     },
//     metadata: {
//         fontSize: 14,
//         color: '#888',
//         marginBottom: 4,
//     },
// });

// export default QnAComponent;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';

const QnAComponent = ({ item }) => {

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday:'short', year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.userInfo}>
                    {/* Updated to handle potentially missing `questionByName` */}
                    <Avatar.Text size={30} label={(item.questionByName?.charAt(0) || 'U').toUpperCase()} />
                    <Text style={styles.username}>{item.questionByName || 'Unknown'}</Text>
                    <Text style={styles.timestamp}>{item.uploadedAt ? formatDate(item.uploadedAt) : 'N/A'}</Text>
                </View>
                <Text style={styles.question}>{item.question}</Text>
                {item.answered && (
                    <>
                        <Text style={styles.answer}>{item.answer}</Text>
                        
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start', // Ensures date text is aligned to the right
        width: '100%', // Ensures the row uses full width to align children properly
        marginBottom: 10,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    question: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    answer: {
        fontSize: 14,
        color: '#4CAF50',
        marginBottom: 5,
    },
    timestamp: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        marginLeft:'auto'
    }
});

export default QnAComponent;


// const [questions, setQuestions] = useState([]);
    // const [isFetching, setIsFetching] = useState(false);
      
    
    // const fetchQuestions = async () => {
    //     if (isFetching) return;
    //     console.log('Fetching questions...'); // Log when fetching starts
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         const response = await axios.get(`${baseUrl}/api/question/approved-questions`, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    //         console.log('Data fetched:', response.data); // Log the data fetched
    //         setQuestions(response.data);
    //         setIsFetching(false);
    //     } catch (error) {
    //         setIsFetching(false);
    //         console.error('Failed to fetch questions:', error);
    //     }
    // };
    // useEffect(() => {
    //     if (!isFetching) {
    //         setIsFetching(true);
    //         fetchQuestions();
    //     }
    // }, []);