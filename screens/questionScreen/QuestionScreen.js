import { View, Text, TouchableOpacity, StyleSheet, Button, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import quizzes from '../quizScreen/quizzes';


const QuestionScreen = ({ route, navigation }) => {
  const { quizTitle } = route.params;
  const quiz = quizzes.find(q => q.title === quizTitle);
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const handleOptionSelect = (questionsId, optionsId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionsId]: optionsId,
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
            selectedOptions[questions.id] === options.id && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(questions.id, options.id)}
        >
          <Text style={styles.optionText}>{options.optionText}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={quiz.questions}
        renderItem={renderQuestionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('QuizScreen')} style={styles.backButton}>
              <Text style={styles.backButtonText}>Go Back</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Questions</Text>
          </View>
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
    backgroundColor: '#7f3db5',
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
    backgroundColor: '#7f3db5',
    borderRadius: 5,
    zIndex: 100, // Ensure the button is above other elements
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
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