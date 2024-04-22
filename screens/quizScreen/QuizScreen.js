import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../data/baseUrl';
const QuizScreen = ({ navigation }) => {

  const [quizzes, setQuizzes] = useState([]);
  const [token, setToken] = useState([]);
  const [isGuest, setIsGuest] = useState(false);
  
  useEffect(() => {
    // Function to retrieve the token from AsyncStorage
    const checkGuestStatus = async () => {
      const guestStatus = await AsyncStorage.getItem('isGuest');
      setIsGuest(guestStatus === 'true');
    };
    checkGuestStatus();
    const retrieveToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // console.log(retrievedToken);
        if (token) {
          setToken(token);
        } 
        console.log(token);
      } catch (error) {
        console.error("Failed to retrieve the token:", error);

      }
    };
    retrieveToken();
  }, []);
  // console.log(token);
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (token && !isGuest) {  // Check if token is available
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
          console.log('Authorization Header:', `Bearer ${token}`);
          const response = await axios.get(`${baseUrl}/api/quiz/quiz-types`, { headers });
          // console.log(response);
          setQuizzes(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch quizzes:", error);
        }
      }
      else {
        Alert.alert(
          "Restricted Access",
          "Guest users do not have access to quizzes. Please log in or register to take a quiz.",
          [
            { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
          ],
        );
      }
    };
    fetchQuizzes();
  }, [token, isGuest]);  // Depend on token state
  

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity
      style={styles.quizButton}
      onPress={() => navigation.navigate('QuestionScreen', { quizName: item.quizName , quizTypeId: item.quizTypeId })}
    >
      <Text style={styles.quizButtonText}>{item.quizName}</Text>
    </TouchableOpacity>
  );



  return (
    <View style={{ flex: 1, marginTop:8 }}>
      <TouchableOpacity onPress={() => navigation.goBack() }>
              <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.quizText}>Quizzes</Text>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  quizButton: {
    backgroundColor: '#9B8BCA',
    paddingVertical: 25, // Make the button taller
    paddingHorizontal: 20,
    // padding: 25
    // top: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    width: 370,
    height: 180,
    justifyContent: 'center',
    elevation: 10,
    shadowOffset: { width: 0, height: 5 },
    // height: 50,
    // width: 50,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 15,
    padding: 8,
    backgroundColor: '#9B8BCA',
    borderRadius: 5,
    elevation: 3,
  },
  backButtonText: {
    color: '#9B8BCA',
    top: 40,
    left: 10,
    fontSize: 18,
  },
  quizText:{
    lineHeight : 160,
    fontWeight: '500',
    fontSize: 25,
    top: 20,
    bottom: 5,
    left: 20
    // textShadowOffset: { width: 1, height: 2 },
    // textShadowRadius: 0.5,
  }
});

export default QuizScreen;