import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../data/baseUrl';
import Header from '../../Components/HeaderComponent';
// import translate from 'translate-google-api';
import i18n from '../../i18';


const QuizScreen = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [token, setToken] = useState([]);
  const [isGuest, setIsGuest] = useState(false);
  const [language, setLanguage] = useState("en"); 
  useEffect(() => {
    setLanguageFromAsyncStorage();
  }, []);

  const setLanguageFromAsyncStorage = async () => {
    const selectedLanguage = await AsyncStorage.getItem('language');
    setLanguage(selectedLanguage || 'en');
  };
  
  useEffect(() => {
    // Function to retrieve the token from AsyncStorage
    const checkGuestStatus = async () => {

      const guestStatus = await AsyncStorage.getItem('isGuest');
      setIsGuest(guestStatus === 'true');
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setToken(token);
      } 

      if(guestStatus !== 'true')
      {
        await fetchQuizzes(token,guestStatus);
      }
      else{
        return Alert.alert(
          "Restricted Access",
          "Guest users do not have access to quizzes. Please log in or register to take a quiz.",
          [
            { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
          ],
        );
      }
    };

    checkGuestStatus();
  }, []);


    const  fetchQuizzes= async (token,isGuestString) => {
      
      if (token && isGuestString !=='true') {  // Check if token is available
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
          console.log('Authorization Header:', `Bearer ${token}`);
          const response = await axios.get(`${baseUrl}/api/quiz/quiz-types`, { headers });
          // console.log(response);
          setQuizzes(response.data);
          
        } catch (error) {
          // console.error("Failed to fetch quizzes:", error);
        }
      }
      else {
        Alert.alert(
          "Restricted Access",
          "Guest users do not have access to quizzes. Please log in or register to take a quiz.",
          [
            { text: "OK", onPress: () => navigation.navigate('ProfileScreen') }
          ],
        );
      }
    };
  // Depend on token state
  

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity
      style={styles.quizButton}
      onPress={() => navigation.navigate('QuestionScreen', { quizName: item.quizName , quizTypeId: item.quizTypeId })}
    >
      <Text style={styles.quizButtonText}>{item.quizName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title={i18n.t("quizScreenTitle", { lng: language })} onPressBack={() => navigation.goBack()} />
      <Text style={styles.titleText}>
        {i18n.t("wellnessCheckIn", { lng: language })}
      </Text>
      <Text style={styles.descriptionText}>
        {i18n.t("quizDescription", { lng: language })}
      </Text>
      <FlatList
        data={quizzes}
        renderItem={renderQuizItem}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={styles.listContainer}
      />
      {quizzes.length === 0 && <ActivityIndicator size="large" color="#0000ff" />}
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

    quizText:{
      lineHeight : 160,
      fontWeight: '500',
      fontSize: 25,
      top: 20,
      bottom: 5,
      left: 20
      
    },
    titleText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#9B8BCA',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 16,
      lineHeight: 24,
      color: '#4A4E69',
      textAlign: 'center',
      paddingHorizontal: 10,
      marginBottom: 20,
    }
  });
export default QuizScreen;



// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { baseUrl } from '../../data/baseUrl';
// import { Alert } from 'react-native';
// import Header from '../../Components/HeaderComponent';
// const QuizScreen = ({ navigation }) => {

//   const [quizzes, setQuizzes] = useState([]);
//   const [token, setToken] = useState([]);
//   const [isGuest, setIsGuest] = useState(false);
  
//   useEffect(() => {
//     // Function to retrieve the token from AsyncStorage
//     const checkGuestStatus = async () => {

//       const guestStatus = await AsyncStorage.getItem('isGuest');
//       setIsGuest(guestStatus === 'true');
//       const token = await AsyncStorage.getItem('token');

//       if (token) {
//         setToken(token);
//       } 

//       if(guestStatus !== 'true')
//       {
//         await fetchQuizzes(token,guestStatus);
//       }
//       else{
//         return Alert.alert(
//           "Restricted Access",
//           "Guest users do not have access to quizzes. Please log in or register to take a quiz.",
//           [
//             { text: "OK", onPress: () => navigation.navigate('LoginScreen') }
//           ],
//         );
//       }
//     };

//     checkGuestStatus();
//   }, []);


//     const  fetchQuizzes= async (token,isGuestString) => {
      
//       if (token && isGuestString !=='true') {  // Check if token is available
//         try {
//           const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           };
//           console.log('Authorization Header:', `Bearer ${token}`);
//           const response = await axios.get(`${baseUrl}/api/quiz/quiz-types`, { headers });
//           // console.log(response);
//           setQuizzes(response.data);
          
//         } catch (error) {
//           // console.error("Failed to fetch quizzes:", error);
//         }
//       }
//       else {
//         Alert.alert(
//           "Restricted Access",
//           "Guest users do not have access to quizzes. Please log in or register to take a quiz.",
//           [
//             { text: "OK", onPress: () => navigation.navigate('ProfileScreen') }
//           ],
//         );
//       }
//     };
//   // Depend on token state
  

//   const renderQuizItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.quizButton}
//       onPress={() => navigation.navigate('QuestionScreen', { quizName: item.quizName , quizTypeId: item.quizTypeId })}
//     >
//       <Text style={styles.quizButtonText}>{item.quizName}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ flex: 1, marginTop:8 }}>
//         <View>
//         <Header title="Quiz Screen" onPressBack={() => navigation.goBack()} />
//         </View>
//         <Text style = {styles.titleText}>
//         Wellness Check-In
//       </Text>
//       <Text style={styles.descriptionText}>
//         Take a moment to assess your overall well-being. This quiz helps you understand where you stand on your journey to a healthier and happier you.
//       </Text>
//       <FlatList
//         data={quizzes}
//         renderItem={renderQuizItem}
//         keyExtractor={(item, index) => String(index)}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   listContainer: {
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//   },
//   quizButton: {
//     backgroundColor: '#9B8BCA',
//     paddingVertical: 25, // Make the button taller
//     paddingHorizontal: 20,
//     // padding: 25
//     // top: 20,
//     borderRadius: 15,
//     alignItems: 'center',
//     marginBottom: 15,
//     width: 370,
//     height: 180,
//     justifyContent: 'center',
//     elevation: 10,
//     shadowOffset: { width: 0, height: 5 },
//     // height: 50,
//     // width: 50,
//   },
//   quizButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 10,
//     left: 15,
//     padding: 8,
//     backgroundColor: '#9B8BCA',
//     borderRadius: 5,
//     elevation: 3,
//   },
//   backButtonText: {
//     color: '#9B8BCA',
//     top: 40,
//     left: 10,
//     fontSize: 18,
//   },
//   quizText:{
//     lineHeight : 160,
//     fontWeight: '500',
//     fontSize: 25,
//     top: 20,
//     bottom: 5,
//     left: 20
    
//   },
//   titleText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#9B8BCA',
//     textAlign: 'center',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   descriptionText: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#4A4E69',
//     textAlign: 'center',
//     paddingHorizontal: 10,
//     marginBottom: 20,
//   }
// });

// export default QuizScreen;
