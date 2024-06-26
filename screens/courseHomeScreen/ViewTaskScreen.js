import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Header from '../../Components/HeaderComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../data/baseUrl';
import translate from 'translate-google-api';


const ViewTaskScreen = ({ navigation }) => {
  const route = useRoute();

  const { taskData,courseId,completedTasks} = route.params;
  
  // const [completedText,setCompletedText]=useState("Mark as Completed")
  const [isDisabled,setIsDisabled]=useState(false);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [isCompleted,setIsCompleted]=useState();

  const handleLinkPress = () => {
    Linking.openURL(taskData.link);
  };

  // console.log(taskData);
  
  useEffect(() => {

    const checkIfGuest = async () => {
      await convertSelectedLanguageDescription(taskData.description);
      await convertSelectedLanguageTitle(taskData.title);
      
    };
    checkIfGuest()
    checkIfTaskCompleted();
  }, [isCompleted])

  const checkIfTaskCompleted= async()=>{
    const currentTask = ((taskData['weekNo']- 1) * 2) + taskData['taskNo']
    
    if(currentTask<=completedTasks)
      {
        setIsCompleted(true);
      }
  }

  const markAsCompleted = async(taskData)=>{
  
    const token = await  AsyncStorage.getItem('token');
    const patientId = await  AsyncStorage.getItem('userId');

    // console.log(patientId);

    try {
      const response = await axios.put(`${baseUrl}/api/patient/${patientId}/mark-complete/${courseId}`,{},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);

      // setCompletedText("Completed");
      // setIsDisabled(true);
      Alert.alert("Task Completed Successfully"
        ,"Congratulations on Successfully completing the task!",
        [{text:"Continue Improving"}]
      )
      setIsCompleted(true);
      navigation.navigate('ExploreScreen')

  }catch (error) {
    console.error(error);
    // Alert.alert('Error',"Please try again later");
  }
}


const convertSelectedLanguageDescription = async(text)=>{
  // console.log(text);
  let result=text;
  const getSelectedLanguage = await AsyncStorage.getItem('language');

    if(getSelectedLanguage==='hi')
    {
      result = await translate(text, {
        from:"en",
        to: "hi",
      });
      setDescription(result[0]);
      return;
    }
    setDescription(text);
    // console.log(result[0])
}

const convertSelectedLanguageTitle = async(text)=>{
  // console.log(text);
  let result=text;
  const getSelectedLanguage = await AsyncStorage.getItem('language');

    if(getSelectedLanguage==='hi')
    {
      result = await translate(text, {
        from:"en",
        to: "hi",
      });
      setTitle(result[0]);
      return;
    }
    setTitle(text);
    // console.log(result[0])
}

  return (
    <View style={styles.container}>
      <Header title="Reading Modules" onPressBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.descriptionContainer}>
          <Text className="font-extrabold text-center text-white text-3xl mb-5 " style={{ textDecorationLine: 'underline', // Underline style
}}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
          <TouchableOpacity onPress={handleLinkPress}>
            <Text style={styles.linkText}>Link to resources: {taskData.link}</Text>
          </TouchableOpacity>
        </View>
        {
          !isCompleted && (
            <TouchableOpacity style={styles.completeButton} onPress={() => {markAsCompleted(taskData)}}>
            <Text style={styles.completeButtonText}>Mark As Completed</Text>
          </TouchableOpacity>
          )
        }
        {
          isCompleted && (
            <TouchableOpacity style={styles.completeButton} disabled={isCompleted} onPress={() => null}>
              <Text style={styles.completeButtonText}>Completed</Text>
            </TouchableOpacity>
          )
        }
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  descriptionContainer: {
    backgroundColor: '#C197D2',
    padding: 10,
    margin: 10,
    marginTop: 30,
    borderRadius: 20,
    
  },
  descriptionText: {
    color: 'white',
    fontSize: 22,
    justifyContent: 'center',
    textAlign: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  completeButton: {
    //position: 'absolute',
   // bottom: 20, // Adjust as needed
   marginBottom:10,
    alignSelf: 'center',
    backgroundColor: '#C197D2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ViewTaskScreen;
