import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';


const QuizScreen = ({ navigation }) => {
  const quizzes = [
    { id: '1', title: 'GAD7' },
    { id: '2', title: 'PHQ9' },
    // { id: '3', title: 'Science' },
    // { id: '4', title: 'CS' },
    // { id: '5', title: 'AI' },
    // { id: '6', title: 'ML' },
  ];

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity
      style={styles.quizButton}
      onPress={() => navigation.navigate('QuestionScreen', { quizTitle: item.title })}
    >
      <Text style={styles.quizButtonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack() }>
              <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.quizText}>Quizzes</Text>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item) => item.id}
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
    backgroundColor: '#7f3db5',
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
    backgroundColor: '#7f3db5',
    borderRadius: 5,
    elevation: 3,
  },
  backButtonText: {
    color: 'purple',
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