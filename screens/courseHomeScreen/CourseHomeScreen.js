import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet,FlatList, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../../Components/HeaderComponent';
import { ProgressBar, MD3Colors, ActivityIndicator } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import CoursesCardComponent from '../../Components/CoursesCardComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../../data/baseUrl';

const CourseHomeScreen = ({ navigation }) => {
  const route = useRoute();
 
  const { param1,param2,param3 } = route.params;

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isLoading,setIsLoading]= useState(false);
  const [courseMaterial,setCourseMaterial]= useState({});
  const [selectedTask,setSelectedTask] =useState({});
 

  useEffect(() => {
    fetchCoursesByWeek();
  }, [])
  

  const fetchCoursesByWeek = async() => {

    setIsLoading(true);
    const token = await  AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/api/course/get-course/${param1}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data.tasksByWeek);
      setCourseMaterial(response.data.tasksByWeek);
      setSelectedTask(response.data.tasksByWeek[selectedWeek]);

;    } catch (error) {

      // console.log(error.message);
      console.error('Error Getting details:', error);
    }    
   setIsLoading(false);
   
  };
  
  const handleCardPress = (item) => {
    // console.log("Inside component handleCardPress");
    // console.log(item);
    navigation.navigate('ViewTaskScreen',{ taskData: item});
    // navigation.navigate('CourseHomeScreen',{ param1: item.courseId, param2: item.courseName,param3: item.category })

  }


  const renderTaskCard = ({item}) => {
    // console.log(item);
    return (
      <TouchableOpacity className=" mt-6 ml-3 mr-3"onPress={()=>{handleCardPress(item)}}>
        <CoursesCardComponent item={item} courseId = {param1} />
      </TouchableOpacity>
    )
  }


  const handleWeekButtonClick = (week) => {
    setSelectedWeek(week);
    setSelectedTask(courseMaterial[week]);
  };

  return (
        <View className="flex flex-1 bg-[#D3BBDD]">
        <View className=" basis-1/14">
          <Header onPressBack={() => navigation.goBack()} title={param3}/>
        </View>
        <Text className="text-2xl font-bold ml-2 mt-2 text-center">Welcome to the {param2} module!</Text>
        <View className="mt-2 rounded-lg basis-18 m-2 justify-center bg-yellow-100">
          <View className="flex flex-row justify-evenly">
            <View className="m-3">
              <Avatar.Text size={45} label='50%'/>
            </View>
            <View className=" flex flex-1 justify-evenly content-center flex-col w-6">
                <View>
                  <Text className="justify-center text-lg font-bold">Your Current Progress</Text>
                </View>
                <View className="flex flex-row content-center">
                  <View className=" w-11/12">
                    <ProgressBar  progress={0.25}  color='purple' />
                  </View>
                </View>
            </View>
          </View>
        </View>
        <View className="mt-2 rounded-lg basis-16 m-2 justify-center">
          <View className="flex flex-row justify-around">
            {
              Object.keys(courseMaterial).map(key =>(
                <View>
                <Button 
                  title={`Week ${key}`} 
                  onPress={() => handleWeekButtonClick(parseInt(key))} 
                  color={selectedWeek === parseInt(key) ? 'blue' : 'gray'}
                  // accessibilityLabel="Select Week 1"
                />
              </View>
              ))
            }

          </View>
        </View>
        <View className="mt-2 rounded-3xl flex flex-1 bg-white  justify-center">
          {isLoading && <ActivityIndicator size={40}/>}
          {!isLoading && (
            <FlatList
            data={selectedTask}
            renderItem={({ item}) => renderTaskCard(item={item})}
            keyExtractor={(item,index) => index}
            horizontal={false}
        />
          )}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    color: 'black',
    
  },
});

export default CourseHomeScreen;

{/* 
<View>
<Header title={`${param2} Module`} onPressBack={() => navigation.goBack()} />
<View className="">
  <Text>Welcome to the {param2} module!</Text>
  <View style={styles.buttonContainer}>
    <Button 
      title="Week 1" 
      onPress={() => handleWeekButtonClick(1)} 
      color={selectedWeek === 1 ? 'blue' : 'gray'}
      accessibilityLabel="Select Week 1"
      style={styles.buttonText}
    />
    <Button 
      title="Week 2" 
      onPress={() => handleWeekButtonClick(2)} 
      color={selectedWeek === 2 ? 'blue' : 'gray'}
      accessibilityLabel="Select Week 2"
      style={styles.buttonText}
    />
    <Button 
      title="Week 3" 
      onPress={() => handleWeekButtonClick(3)} 
      color={selectedWeek === 3 ? 'blue' : 'gray'}
      accessibilityLabel="Select Week 3"
      style={styles.buttonText}
    />
    <Button 
      title="Week 4" 
      onPress={() => handleWeekButtonClick(4)} 
      color={selectedWeek === 4 ? 'blue' : 'gray'}
      accessibilityLabel="Select Week 4"
      style={styles.buttonText}
    />
  </View>
  {selectedWeek && (
    <View>
      <Text>Content for Week {selectedWeek}</Text>
      {/* Render content for the selected week here */}
//     </View>
//   )}
// </View>
        
//       </View> */}