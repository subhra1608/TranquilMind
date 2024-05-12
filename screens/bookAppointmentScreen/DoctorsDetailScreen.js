import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView,TouchableOpacity,StyleSheet } from 'react-native';
// import { doctorData } from '../../data/doctorData';
import DoctorCard from '../../Components/DoctorCard';
import Header from '../../Components/HeaderComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { baseUrl } from '../../data/baseUrl';

const DoctorsDetailScreen = ({ navigation }) => {

  
  useEffect(() => {
    fetchDoctorData();
  }, []);

  const [doctorData,setDoctorData] = useState([]);


  const fetchDoctorData = async () => {
    try {
      const token = await  AsyncStorage.getItem('token');
      // console.log(token);
      const response = await axios.get(`${baseUrl}/api/appointment/doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const enrichedDoctorData = response.data.map(doctor => ({
        ...doctor,
        fullName: `${doctor.firstName} ${doctor.lastName}`,
        gender: doctor.gender,
        description: doctor.description || 'No description available',
        imageUri: doctor.image || 'default_uri' // Assuming 'imageUri' is the key for the image URL

      }));
  
      console.log(enrichedDoctorData);
      setDoctorData(enrichedDoctorData);
  
      // Store each doctor's full name, gender, and description in AsyncStorage
      enrichedDoctorData.forEach(async doctor => {
        await AsyncStorage.setItem(`doctorFullName${doctor.userId}`, doctor.fullName);
        await AsyncStorage.setItem(`doctorGender${doctor.userId}`, doctor.gender);
        await AsyncStorage.setItem(`doctorDescription${doctor.userId}`, doctor.description);
        await AsyncStorage.setItem(`doctorImageUri${doctor.userId}`, doctor.imageUri);
      });

    } catch (error) {
      console.error('API Error:', error);
      // Handle errors
    }
  };
  
  
  

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity  onPress={() =>navigation.navigate('BookAppointmentScreen',{ param: item }) } >
         <DoctorCard doctorData={item} />
      </TouchableOpacity>
         );
  };

  return (
    <View className="flex flex-1 ">
      <Header title="See Doctor's List" onPressBack={() => navigation.goBack()} />
        <FlatList
          className="bg-white"
          data={doctorData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
        />
     
    </View>
  );
};

export default DoctorsDetailScreen;



const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    marginLeft:40,
    borderRadius:10,
    elevation: 2,
    width:'80%',
    alignItems: 'center',
    padding: 10,
    marginTop:10,
    marginBottom:10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 85,
    height: 100,
    padding:20,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    padding:10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

// const doctorData =[{"age": 42, "appointmentList": [[{"appointmentId": 1, "date": "2024-03-27", "description": "Regular check-up", "endTime": "11:00:00", "remarks": "Patient is responding well to treatment", "startTime": "10:00:00"}, {"appointmentId": 2, "date": "2024-03-27", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 3, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 4, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}, {"appointmentId": 5, "date": "2024-03-28", "description": "Regular check-up", "endTime": "14:00:00", "remarks": "Patient is responding well to treatment", "startTime": "13:00:00"}],], "consultationFee": 100.5, "description": "Dr. John Doe is a qualified and experienced physician specializing in...", "doctorId": 1, "experience": 15, "firstName": "John", "gender": "MALE", "isDisabled": true, "isSenior": true, "lastName": "Doe", "licenceNo": "123456-MD", "middleName": "Michael", "mobileNo": "1234567890", "user": {"accountNonExpired": true, "accountNonLocked": true, "authorities": [Array], "credentialsNonExpired": true, "email": "doctor@gmail.com", "enabled": true, "password": "$2a$10$yy8LTDyGQUTdSTLwEim4hOBGDXd3jSNpIbF4E7k6xRWqkX/h7CtZS", "roles": [Array], "userId": 5, "username": "doctor@gmail.com"}}, {"age": 23, "appointmentList": [], "consultationFee": 500, "description": "hi i am a doctor", "doctorId": 2, "experience": 12, "firstName": "Vivek", "gender": "FEMALE", "isDisabled": true, "isSenior": true, "lastName": "Maltare", "licenceNo": "12345", "middleName": "kumar", "mobileNo": "9617077335", "user": {"accountNonExpired": true, "accountNonLocked": true, "authorities": [Array], "credentialsNonExpired": true, "email": "maltarevivek@gmail.com", "enabled": true, "password": "$2a$10$0vUKwgj94USZRGYNrYTJcuNLYrxy0r8D/8IorUAAiGV0/mMchOeSu", "roles": [Array], "userId": 7, "username": "maltarevivek@gmail.com"}}]