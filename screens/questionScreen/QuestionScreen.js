import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../data/baseUrl';

const QuestionScreen = ({ route, navigation }) => {
  const { quizName, quizTypeId } = route.params;
  console.log(route.params);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${baseUrl}/api/quiz-question/get-questions/${quizName}`, { headers });
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, [quizName]);

 
  const handleOptionSelect = (questionId, optionId, score) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: parseInt(score, 10),
    });
  };

  const renderQuestionItem = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.description}</Text>
      {item.options.map(option => (
        <TouchableOpacity
          key={option.quizAnswerId.toString()}
          style={[
            styles.optionButton,
            selectedOptions[item.quizQuestionId] === parseInt(option.score, 10) ? styles.selectedOption : {}
          ]}
          onPress={() => handleOptionSelect(item.quizQuestionId, option.quizAnswerId, option.score)}
        >
          <Text style={styles.optionText}>{option.answerOption}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );


  const handleSubmit = async () => {
    const patientId = await AsyncStorage.getItem('userId');
    const quizType = { quizName };
    // const totalScore = Object.values(selectedOptions).reduce((acc, curr) => acc + curr, 0);
    const totalScore = Object.values(selectedOptions).reduce((acc, score) => acc + Number(score), 0);
    const jsonQuizScores = questions.map(question => ({
      quizQuestionId: question.quizQuestionId,
      score: selectedOptions[question.quizQuestionId] // Ensure this is the score as a number, not a string
    }));
    const quizScoresData = {
      patientId: Number(patientId), // Convert to number if your backend expects a number
      quizType :
      {
          quizTypeId : quizTypeId,
          quizName : quizName
      },
      totalScore: totalScore,
      jsonQuizScores: JSON.stringify(jsonQuizScores) // Convert the array to a JSON string
    };
    try {
      const token = await AsyncStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
  
      const response = await axios.post(`${baseUrl}/api/quiz/new`, quizScoresData, { headers });
      console.log('Quiz scores submitted:', response.data);
    navigation.navigate('TotalScoreScreen', { score: totalScore });
    }catch (error) {
      console.error("Failed to submit quiz scores:", error);
      // Handle error - perhaps show an error message
    }
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={questions}
        renderItem={renderQuestionItem}
        keyExtractor={item => String(item.quizQuestionId)}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Questions</Text>
          </>
        }
        ListFooterComponent={
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
  
};



const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    marginTop: 30,
    paddingTop: 60, // Increase padding at the top to make space for the back button
  },
  questionContainer: {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '500',
    fontFamily: '', // Change this to your preferred font
    color: '#333',
  },
  optionButton: {
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#9B8BCA',
    borderColor: '#7f3db5',
  },
  optionText: {
    fontSize: 16,
    fontFamily: '', // Change this to your preferred font
    color: '#333',
  },
  backButton: {
    position: 'absolute',
    top: -50,
    left: 0,
    padding: 10,
    backgroundColor: '#9B8BCA',
    borderRadius: 5,
    zIndex: 100, // Ensure the button is above other elements
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: '', // Change this to your preferred font
  },
  submitButton: {
    padding: 15,
    backgroundColor: '#9B8BCA',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  text: {
    fontSize: 24,
    top: -5,
    padding:10,
    left: -3,
    fontWeight: 'bold',
    fontFamily: '', // Change this to your preferred font
  },
});


export default QuestionScreen;


