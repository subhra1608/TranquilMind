import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const TotalScoreScreen = ({ route, navigation }) => {
  const { score } = route.params;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('LandingScreen')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#7f3db5',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TotalScoreScreen;