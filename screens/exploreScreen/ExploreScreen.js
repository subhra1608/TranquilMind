import { View, Text, FlatList, Button, ScrollView,StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../Components/HeaderComponent';
import Card from '../../Components/CardComponent';
import { courseData } from '../../data/courses';
import { baseUrl } from '../../data/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ExploreScreen = ({ navigation }) => {
 
  const [isLoading,setIsLoading]=useState(false);
  // const [courseData,setCourseData]= useState([]);
  const isEnrolled=false;

  useEffect(() => {
    fetchCoursesData();
  }, [])
  
  const enrollUser = async(courseId) => {

    setIsLoading(true);
    const token = await  AsyncStorage.getItem('token');
    const patientId = await  AsyncStorage.getItem('userId');

    try {
      const response = await axios.get(`${baseUrl}/api/patient/${patientId}/enroll-course/${courseId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });;        
      //console.log(response.data);
      // setCourseData(response.data);
      
;    } catch (error) {
      
      console.error('Error Getting details:', error);
    }    
   setIsLoading(false);
  };

  
  const fetchCoursesData = async() => {
    setIsLoading(true);
    const token = await  AsyncStorage.getItem('token');

    try {
      const response = await axios.get(`${baseUrl}/api/course/get-courses`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });       
      // console.log(response.data);
      // setCourseData(response.data);
      const response1 = await axios.get(`${baseUrl}/api/course/get-courses`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response1.data);
      
;    } catch (error) {
      
      console.error('Error Getting details:', error);
    }    
   setIsLoading(false);
  };
  

  const renderItem = ({ item }) => {
    
    const onCardPress= () =>{
      navigation.navigate('CourseHomeScreen',{ param1: item.courseId, param2: item.courseName,param3: item.category })
  }
    return (
      <TouchableOpacity disabled={null} onPress={onCardPress}>
        <Card
        id ={item.courseId}
        title={item.category}
        description={item.description}
        imageSource={item.courseImage?item.courseImage:"https://img.freepik.com/premium-vector/flat-valentine-s-day-illustration_52683-157836.jpg"}
      />
      {!isEnrolled===true && (
          <TouchableOpacity onPress={(item)=>{
            enrollUser(item.courseId);
          }} className="flex flex-row rounded-lg mx-6 bg-green-500 justify-center ">
          <Text className="justify-center text-base "> Enroll Now </Text>
        </TouchableOpacity>
        )}

      </TouchableOpacity>  

    );
  };

  return (
    <View className="">
      <View>
        <Header title="Mindful Modules" onPressBack={() => navigation.goBack()} />
        </View>
        <Button
          style={styles.shortButton} // Apply the custom style here
          title="Book an appointment"
          onPress={() => navigation.push('DoctorsDetailScreen')}
          color="#9B8BCA"
        />
      
      {isLoading && <ActivityIndicator  size={40} color='blue'/>}
      
      {!isLoading && 
        (
        <FlatList
        data={courseData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.courseId.toString()}
        numColumns={2}
        horizontal={false}
        />)
      }
      </View>
    
  );
};
const styles = StyleSheet.create({
  shortButton: {
    width: 150, 
  },
});

export default ExploreScreen;
