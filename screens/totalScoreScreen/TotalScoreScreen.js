import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from '../../i18'; // Make sure i18n is correctly set up and imported
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TotalScoreScreen = ({ route, navigation }) => {
  const { score } = route.params;
  const [language, setLanguage] = useState("en");


  useEffect(() => {
    async function loadLanguage() {
      const selectedLanguage = await AsyncStorage.getItem('language');
      console.log("Loaded language:", selectedLanguage);
      setLanguage(selectedLanguage || 'en');
    }
  
    loadLanguage();
  }, []);
  
  console.log("Current language in state:", language);


  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>
        {i18n.t("yourTotalScore", { lng: language })}{score}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('QuizScreen')} style={styles.backButton}>
        <Text style={styles.backButtonText}>
          {i18n.t("backToQuizzes", { lng: language })}
        </Text>
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

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { baseUrl } from '../../data/baseUrl';
// import Header from '../../Components/HeaderComponent';

// const TotalScoreScreen = ({ route, navigation }) => {
//   const { score } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.scoreText}>Your Total Score: {score}</Text>
//       <TouchableOpacity onPress={() => navigation.navigate('QuizScreen')} style={styles.backButton}>
//         <Text style={styles.backButtonText}>Back to Quizzes</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   scoreText: {
//     fontSize: 24,
//     margin: 20,
//   },
//   backButton: {
//     padding: 10,
//     marginTop: 20,
//     backgroundColor: '#9B8BCA',
//     borderRadius: 5,
//   },
//   backButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });

// export default TotalScoreScreen;
