import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { baseUrl } from '../../data/baseUrl';
import Header from '../../Components/HeaderComponent';

const TotalScoreScreen = ({ route, navigation }) => {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Your Total Score: {score}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('QuizScreen')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Quizzes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    margin: 20,
  },
  backButton: {
    padding: 10,
    marginTop: 20,
    backgroundColor: '#9B8BCA',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TotalScoreScreen;
