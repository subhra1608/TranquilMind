import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Header from '../../Components/HeaderComponent';
import ButtonComponent from '../../Components/ButtonComponent';
import { Avatar } from 'react-native-paper';
import { baseUrl } from '../../data/baseUrl';
import { StyleSheet } from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['`flexWrap: `wrap`` is not supported with the `VirtualizedList` components.']);


const BookAppointmentScreen = ({ navigation }) => {
  const { param } = useRoute().params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [remark, setRemark] = useState('');
  const [doctorFullName, setDoctorFullName] = useState('');
  const [doctorGender, setDoctorGender] = useState('');
  const [doctorDescription, setDoctorDescription] = useState('');

  useEffect(() => {
    fetchDoctorDetails();
  }, [param]);

  const fetchDoctorDetails = async () => {
    try {
      const fullName = await AsyncStorage.getItem(`doctorFullName${param.userId}`);
      const gender = await AsyncStorage.getItem(`doctorGender${param.userId}`);
      const description = await AsyncStorage.getItem(`doctorDescription${param.userId}`);
      
      if (fullName) setDoctorFullName(fullName);
      if (gender) setDoctorGender(gender);
      if (description) setDoctorDescription(description);
    } catch (error) {
      console.error('Failed to fetch doctor details from AsyncStorage:', error);
    }
  };

  const getNextSixDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  const [nextDates, setNextDates] = useState(getNextSixDates());

  const handleDatePress = (date) => {
    setSelectedDate(date);
  };
  const storeDoctorId = async (doctorId) => {
    try {
      await AsyncStorage.setItem('doctorId', String(doctorId));
      console.log('Doctor ID saved successfully:', doctorId);
    } catch (error) {
      console.error("Failed to save doctor ID:", error);
    }
  };

  const handleAppointment = async () => {
    if (!selectedDate) {
      Alert.alert("No date selected", "Please select a date first.");
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      const patientId = await AsyncStorage.getItem('userId');

      const payload = {
        doctorId: param.userId,
        patientId: patientId,
        date: selectedDate.toISOString().substring(0, 10),
        description: remark,
        remarks: remark
      };
      await storeDoctorId(param.userId);
      const response = await axios.post(`${baseUrl}/api/appointment/new-appointment`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      console.log(response.data);
      Alert.alert('Appointment Booked Successfully', 
      `Your appointment on ${formatDate(selectedDate)} is confirmed and valid for 3 days.`,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error("API error:", error);
      Alert.alert("Failed to book appointment", error.message);
    }
  };

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'long', day: 'numeric' }; // Includes the day of the week
    return date.toLocaleDateString('en-GB', options); // 'en-GB' ensures European date formatting
  };
  
  

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <Header title="Book Appointment" onPressBack={() => navigation.goBack()} />
        </View>
      <View style={styles.doctorInfoContainer}>
      <Avatar.Image 
          size={150} 
          source={{ uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg" }}
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.doctorDetails}>Name: Dr. {doctorFullName}</Text>
        <Text style={styles.doctorDetails}>Gender: {doctorGender}</Text>
        <Text style={styles.doctorDetails}>Description: {doctorDescription || 'No description provided'}</Text>
        
      </View>
      <Text style={styles.title}>Book Your Appointment</Text>
      <FlatList
        data={nextDates}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => handleDatePress(item)}
          >
            <Text style={styles.dateText}>{formatDate(new Date(item))}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
        contentContainerStyle={styles.dateContainer}
        removeClippedSubviews={true}
      />
      {selectedDate && (
        <Text style={styles.selectedDateText}>Selected Date: {formatDate(new Date(selectedDate))}</Text>
      )}
      {selectedDate && (
        <TouchableOpacity style={styles.bookButton} onPress={handleAppointment}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  doctorInfoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  doctorDetails: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexWrap: 'wrap',
  },
  dateButton: {
    backgroundColor: '#e6e6fa', // Light lavender
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: '#333',
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#9B8BCA', // Thistle color for the button
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
    marginTop: 30,
    marginBottom: 150,
  },
  selectedDateText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
    color: '#4B0082',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  }
});
export default BookAppointmentScreen;





// const doctorData = {"age": 42, "appointmentList": [{"appointmentId": 1, "date": "2024-03-27", "description": "Regular check-up", "endTime": "11:00:00", "remarks": "Patient is responding well to treatment", "startTime": "10:00:00"}, {"appointmentId": 2, "date": "2024-03-27", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 3, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 4, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 5, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}], "consultationFee": 100.5, "description": "Dr. John Doe is a qualified and experienced physician specializing in...", "doctorId": 1, "experience": 15, "firstName": "John", "gender": "MALE", "isDisabled": true, "isSenior": true, "lastName": "Doe", "licenceNo": "123456-MD", "middleName": "Michael", "mobileNo": "1234567890", "user": {"accountNonExpired": true, "accountNonLocked": true, "authorities": [[Object]], "credentialsNonExpired": true, "email": "doctor@gmail.com", "enabled": true, "password": "$2a$10$yy8LTDyGQUTdSTLwEim4hOBGDXd3jSNpIbF4E7k6xRWqkX/h7CtZS", "roles": [[Object]], "userId": 5, "username": "doctor@gmail.com"}}

{/* <Avatar.Image size={150} source={{ uri: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg" }} /> */}
