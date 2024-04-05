import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import quizzes from '../quizScreen/quizzes';
// import { Button } from 'react-native-paper';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const QuestionScreen = ({ route, navigation }) => {
  
  const { quizTitle } = route.params;
  const quiz = quizzes.find(q => q.title === quizTitle);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const handleOptionSelect = (questionsId, optionsId, score) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionsId]: score,
    });
  };
 
  // console.log(questionsId);

  const renderQuestionItem = ({ item: questions }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{questions.questionText}</Text>
      {questions.options.map(options => (
        <TouchableOpacity
          key={options.id}
          style={[
            styles.optionButton,
            selectedOptions[questions.id] === options.score && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(questions.id, options.id, options.score)}
        >
          <Text style={styles.optionText}>{options.optionText}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  const getToken = async () => {
    return await AsyncStorage.getItem('accessToken');
  };
  
  const submitQuizScores = async (quizScores) => {
    try {
      const response = await axios.post('http://yourbackend.com/quiz/new', quizScores);
      if (response.status === 200) {
        console.log('Quiz scores saved successfully:', response.data);
        // Handle success (maybe navigate to a success screen or show a message)
      }
    } catch (error) {
      console.error('Error submitting quiz scores:', error.response || error.message);
      // Handle error (show error message to user)
    }
  };


  


  const handleSubmit = async () => {
    const token = await getToken();
    const decodedToken = jwtDecode(token);
    const patientId = decodedToken.id;
    const totalScore = Object.values(selectedOptions).reduce((acc, score) => acc + score, 0);
  
    const quizScores = {
      quizId: quiz.id, // The ID of the current quiz
      patientId: patientId, // Retrieved from the token
      scores: selectedOptions, // Contains scores for individual questions
      totalScore: totalScore, // The total score
    };
  
    await submitQuizScores(quizScores);
  };
  
  
  return (
    <View style={styles.container}>
      <FlatList
        data={quiz.questions}
        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.id}
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

const styles = StyleSheet.create(
  {
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
    // fontFamily: 'Avenir', // Change this to your preferred font
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
  },
});


export default QuestionScreen;


