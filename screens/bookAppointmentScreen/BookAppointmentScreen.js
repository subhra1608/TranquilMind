import { View, Text,FlatList, TouchableOpacity,Alert, Button, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Header from '../../Components/HeaderComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import {Avatar} from 'react-native-paper'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { baseUrl } from '../../data/baseUrl';

const BookAppointmentScreen = ({navigation}) => {


  const route = useRoute();
  const { param } = route.params;
  // const param  = {"age": 42, "appointmentList": [{"appointmentId": 1, "date": "2024-03-27", "description": "Regular check-up", "endTime": "11:00:00", "remarks": "Patient is responding well to treatment", "startTime": "10:00:00"}, {"appointmentId": 2, "date": "2024-03-27", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 3, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 4, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 5, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}], "consultationFee": 100.5, "description": "Dr. John Doe is a qualified and experienced physician specializing in...", "doctorId": 1, "experience": 15, "firstName": "John", "gender": "MALE", "isDisabled": true, "isSenior": true, "lastName": "Doe", "licenceNo": "123456-MD", "middleName": "Michael", "mobileNo": "1234567890", "user": {"accountNonExpired": true, "accountNonLocked": true, "authorities": [[Object]], "credentialsNonExpired": true, "email": "doctor@gmail.com", "enabled": true, "password": "$2a$10$yy8LTDyGQUTdSTLwEim4hOBGDXd3jSNpIbF4E7k6xRWqkX/h7CtZS", "roles": [[Object]], "userId": 5, "username": "doctor@gmail.com"}}
  // console.log(param)

  const [selectedDate, setSelectedDate] = useState(); // State to store selected date
  const [selectedTime, setSelectedTime] = useState(null); // State to store selected date
  const [isDateSelected,setIsDateSelected]=useState(false);
  const [isTimeSelected,setIsTimeSelected]=useState(false);
  const [remark, setRemark] = useState('');



  const getNextFiveDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push({ date: nextDate, selected: false });;
    }
    return dates;
  };


  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const markSelectedSlots = (data) => {
    const timeSlots = [
      { selected: false, time: "09:00",isAlreadySelected:false },
      { selected: false, time: "10:00" ,isAlreadySelected:false},
      { selected: false, time: "11:00",isAlreadySelected:false },
      { selected: false, time: "12:00",isAlreadySelected:false },
      { selected: false, time: "13:00",isAlreadySelected:false },
      { selected: false, time: "14:00",isAlreadySelected:false },
      { selected: false, time: "15:00",isAlreadySelected:false },
      { selected: false, time: "16:00",isAlreadySelected:false },
      { selected: false, time: "17:00",isAlreadySelected:false }
    ];
  
    data.forEach(appointment => {
      const startTime = appointment.startTime.split(':')[0] + ':00';
      for (let i = 0; i < timeSlots.length; i++) {
        const time = timeSlots[i].time;
        if (time === startTime) {
          timeSlots[i].isAlreadySelected = true;
        }
      }
    });
  
    return timeSlots;
  };


  const [nextDates, setNextDates] = useState(getNextFiveDates());


  const handleTimeSlotPress = (index) => {

    const updateTimeSlots = selectedTimeSlots.map((time, i) =>
      i === index ? { ...time, selected: true } : { ...time, selected: false }
    );
    setSelectedTimeSlots(updateTimeSlots);
    setSelectedTime(updateTimeSlots[index].time);
    console.log(updateTimeSlots[index].time)
  };


  const handleDatePress = async(index) => {

    const updatedDates = nextDates.map((date, i) =>
      i === index ? { ...date, selected: true } : { ...date, selected: false }
    );
    setNextDates(updatedDates);
    setSelectedDate(updatedDates[index].date);
    
    try {
      const token = await  AsyncStorage.getItem('token');
      const formattedDate = updatedDates[index].date.toISOString().substring(0, 10)    
      
      const response = await axios.get(`${baseUrl}/api/appointment/doctor-appointments/${param.userId}/date/${formattedDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
      });
      // console.log(response.data);
      const slotsSelected = markSelectedSlots(response.data);
      
      setSelectedTimeSlots(slotsSelected)
      // Handle the response data as needed
    } catch (error) {
      console.error('API Error:', error.message);
      // Handle errors
    }
  
  };


  const formatDate = (date) => {
    return date.toDateString();
  };


  const handleRemarkChange = (text) => {
    setRemark(text);
  };

  const handleAppointment = async() => {
    try {
      const token = await  AsyncStorage.getItem('token');
      const patientId = await AsyncStorage.getItem('userId');
    
      payload = {
        "doctorId": param.userId,
        "patientId":patientId,
        "date":selectedDate,
        "startTime":selectedTime,
        "endTime":"00:00:00",
        "description":"heello",
        "remarks":remark
        }
      const response = await axios.post(`${baseUrl}/api/appointment/new-appointment`,payload,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json"
        },
      });
      return Alert.alert(
        'Appointment Booked Successfully',
        `Date :- ${selectedDate} \n Time :- ${selectedTime}`,
        [
          {
            text: 'OK',
            onPress: () => {setIsTimeSelected(false);
              setIsDateSelected(false);
              setRemark('');
            }
          }
        ],
        { cancelable: false }
      );
    

    } catch (error) {
      console.log("API error",error);
    }
  };



  return (
        <KeyboardAvoidingView>
          <View className="mt-6">
            <View className="basis-1/14">
                <Header onPressBack={() => navigation.goBack()} title="Book Your Appointment"/>
            </View>
            <View className=" basis-2/6 rounded-xl">
                <View className="felx-row items-center">
                  <View className=" items-center mt-3">
                    <Avatar.Image size={150} style={{borderRadius:10}} source={{ uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg" }} />
                  </View>
                  <View className="items-start mt-2">
                  <Text>Name: {param.firstName}  {param.middleName}  {param.lastName}</Text>
                  <Text>Age: {param.age}      Gender: {param.gender}</Text>
                  <Text></Text>
                  
                  </View>
                </View>
            </View>
            <View className=" basis-2/10 rounded-lg ">
              <Text className="text-3xl font-bold ml-2">Book Your Appointment</Text>
              <View>
              <FlatList
                  data={nextDates}
                  numColumns={3}
                  keyExtractor={(item, index) => item.date.toString()}
                  renderItem={({ item, index }) => (

                    <ButtonComponent
                      color="cyan"
                      title={formatDate(item.date)}
                      onPress={() => 
                        {
                          handleDatePress(index);
                          setIsDateSelected(true);
                        }
                      }
                      selected={item.selected}
                    />
                  )}
                />
              </View>             
              {selectedDate && <Text>Selected Date: {selectedDate.toDateString()}</Text>}

            </View>
            <View className="basis-auto mt-2">
                <TextInput
                className="rounded-lg"
                  style={{
                    height:40,
                    borderColor: 'black',
                    borderWidth: 1,
                    padding: 10,
                    margin: 10,
                  }}
                  multiline
                  placeholder="You are going for..."
                  value={remark}
                  onChangeText={handleRemarkChange}
                />
              </View>
            <View className="basis-auto mt-2">
              {(isDateSelected) &&
              (
                <FlatList
                  data={selectedTimeSlots}
                  numColumns={3}
                  keyExtractor={(item, index) => index}
                  renderItem={({ item, index }) => (
                    <ButtonComponent
                      color="cyan"
                      title={item.time}
                      onPress={() => 
                        {
                          handleTimeSlotPress(index);
                          
                          setIsTimeSelected(true);
                        }
                      }
                      selected={item.selected}
                      isAlreadySelected={item.isAlreadySelected}

                    />
                  )}
                />
              )
             
            }
            </View>
            
            {isTimeSelected && (
              <View className="basis-auto justify-center mt-5">
                <TouchableOpacity className="bg-orange-300 h-10" onPress={()=>{handleAppointment()}}>
                  <Text className="text-center text-xl font-bold mt-1">Submit</Text>
                </TouchableOpacity>
              </View>
            )}
          
        </View>
        </KeyboardAvoidingView>
  )
}

export default BookAppointmentScreen


const doctorData = {"age": 42, "appointmentList": [{"appointmentId": 1, "date": "2024-03-27", "description": "Regular check-up", "endTime": "11:00:00", "remarks": "Patient is responding well to treatment", "startTime": "10:00:00"}, {"appointmentId": 2, "date": "2024-03-27", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 3, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 4, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 5, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}], "consultationFee": 100.5, "description": "Dr. John Doe is a qualified and experienced physician specializing in...", "doctorId": 1, "experience": 15, "firstName": "John", "gender": "MALE", "isDisabled": true, "isSenior": true, "lastName": "Doe", "licenceNo": "123456-MD", "middleName": "Michael", "mobileNo": "1234567890", "user": {"accountNonExpired": true, "accountNonLocked": true, "authorities": [[Object]], "credentialsNonExpired": true, "email": "doctor@gmail.com", "enabled": true, "password": "$2a$10$yy8LTDyGQUTdSTLwEim4hOBGDXd3jSNpIbF4E7k6xRWqkX/h7CtZS", "roles": [[Object]], "userId": 5, "username": "doctor@gmail.com"}}